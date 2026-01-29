import { Injectable } from '@angular/core';
import axios from 'axios';
import type { Enterprise, User, ZendeskTicket, ZendeskComment } from '../types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TelecrmService {
  constructor() {}

  async getTeamMembers(enterpriseId: string): Promise<User[] | null> {
    let customerTeamMembers: User[] | null = null;

    try {
      const response = await axios.get(
        `${environment.serverUrl}/enterprise/${enterpriseId}/license-response-schema`,
        {
        headers: {
          Authorization: environment.telecrmApiKey,
           "ngrok-skip-browser-warning": "6.x",
        },
        },
      );

      if(response.data?.teamMembers) {
        customerTeamMembers = response.data?.teamMembers;
      }
    } catch (error) {
      console.error("Error fetching team members for enterprise: ", enterpriseId, error);
    }

    if(customerTeamMembers) {
      customerTeamMembers = customerTeamMembers.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        photoUrl: member.photoUrl,
        role: member.role,
      }));
    }

    return customerTeamMembers;
  }

  async getEnterprise(enterpriseId: string): Promise<Enterprise | null> {
    let enterprise: Enterprise | null = null;

    try {
      const response = await axios.get(
        `${environment.serverUrl}/enterprise/${enterpriseId}`,
        {
        headers: {
          Authorization: environment.telecrmApiKey,
          "ngrok-skip-browser-warning": "6.x",
        },
      },
    );

      if(response.data) {
        enterprise = response.data;
      }
    } catch (error) {
      console.error("Error fetching enterprise: ", enterpriseId, error);
    }

    return enterprise;
  }

  private encodeBase64(str: string): string {
    // Simple base64 encoding for Basic Auth (email and token are ASCII)
    return btoa(str);
  }

  async getZendeskTicket(ticketId: string): Promise<ZendeskTicket | null> {
    let ticket: ZendeskTicket | null = null;

    try {
      // Basic Auth format: username/token:password
      // Username: love@telecrm.in/token
      // Password: API token
      const username = `${environment.zendeskApiEmail}/token`;
      const auth = this.encodeBase64(`${username}:${environment.zendeskApiToken}`);
      
      // Use proxy path to avoid CORS - proxy forwards to Zendesk
      // In browser network tab it shows localhost:4200, but proxy forwards to Zendesk
      const apiUrl = '/api/v2';
      
      const response = await axios.get(
        `${apiUrl}/tickets/${ticketId}.json`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.ticket) {
        ticket = response.data.ticket;
      }
    } catch (error) {
      console.error("Error fetching Zendesk ticket: ", ticketId, error);
    }

    return ticket;
  }

  async getZendeskTicketComments(ticketId: string): Promise<ZendeskComment[]> {
    let comments: ZendeskComment[] = [];

    try {
      // Basic Auth format: username/token:password
      // Username: love@telecrm.in/token
      // Password: API token
      const username = `${environment.zendeskApiEmail}/token`;
      const auth = this.encodeBase64(`${username}:${environment.zendeskApiToken}`);
      
      // Use proxy path to avoid CORS - proxy forwards to Zendesk
      // In browser network tab it shows localhost:4200, but proxy forwards to Zendesk
      const apiUrl = '/api/v2';
      
      const response = await axios.get(
        `${apiUrl}/tickets/${ticketId}/comments.json`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.comments) {
        comments = response.data.comments;
      }
    } catch (error) {
      console.error("Error fetching Zendesk ticket comments: ", ticketId, error);
    }

    return comments;
  }
}
