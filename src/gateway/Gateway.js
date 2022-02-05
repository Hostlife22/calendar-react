const baseUrl = 'https://61fe6ef8a58a4e00173c984d.mockapi.io/events';

export default class Gateway {
  static async getEvents() {
    const response = await fetch(baseUrl);

    return response;
  }

  static async createEvent(eventData) {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(eventData),
    });

    return response;
  }

  static async updateEventList(id, updatedeventData) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(updatedeventData),
    });

    return response;
  }

  static async deleteEvent(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });

    return response;
  }
}
