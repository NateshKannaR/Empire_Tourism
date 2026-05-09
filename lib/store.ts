'use client';

import { TripData, PackingList } from './types';

class Store {
  private trips: TripData[] = [];
  private packingLists: Map<string, PackingList> = new Map();
  private listeners: Set<() => void> = new Set();
  private initialized = false;
  private useBackend = true;

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  async initialize() {
    if (this.initialized) return;
    await this.loadTrips();
    await this.loadPackingLists();
    this.initialized = true;
  }

  private async request<T>(path: string, options?: RequestInit) {
    const response = await fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async loadTrips() {
    try {
      if (!this.useBackend) return;
      const data = await this.request<{ trips: TripData[] }>('/api/trips');
      this.trips = data.trips ?? [];
      this.notify();
    } catch (error) {
      console.warn('Backend unavailable, using local memory');
      this.useBackend = false;
    }
  }

  async loadPackingLists() {
    try {
      if (!this.useBackend) return;
      const data = await this.request<{ lists: PackingList[] }>('/api/packing-lists');
      if (data.lists) {
        data.lists.forEach(list => this.packingLists.set(list.tripId, list));
        this.notify();
      }
    } catch (error) {
      console.warn('Error loading packing lists');
    }
  }

  async addTrip(trip: TripData) {
    this.trips.unshift(trip);
    this.notify();

    if (this.useBackend) {
      try {
        const data = await this.request<{ trip: TripData }>('/api/trips', {
          method: 'POST',
          body: JSON.stringify(trip),
        });
        if (data.trip) {
          this.trips = [data.trip, ...this.trips.filter(item => item.id !== trip.id)];
          this.notify();
        }
      } catch (error) {
        console.warn('Backend insert failed');
      }
    }
  }

  getTrips() {
    return this.trips;
  }

  async setPackingList(list: PackingList) {
    this.packingLists.set(list.tripId, list);
    this.notify();

    if (this.useBackend) {
      try {
        await this.request('/api/packing-lists', {
          method: 'POST',
          body: JSON.stringify(list),
        });
      } catch (error) {
        console.warn('Backend packing list save failed');
      }
    }
  }

  getPackingList(tripId: string) {
    return this.packingLists.get(tripId);
  }

  async updatePackingList(tripId: string, updater: (list: PackingList) => PackingList) {
    const current = this.packingLists.get(tripId);
    if (current) {
      const updated = updater(current);
      await this.setPackingList(updated);
    }
  }
}

export const store = new Store();
