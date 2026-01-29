// NOTE: If number of lines crosses 300-500, refactor the file into multiple files

export interface User {
  id: string;
  name: string;
  email: string;
  initial?: string;
  photoUrl?: string;
  role?: string;
}

export interface TicketCreator {
  id: string;
  name: string;
  email: string;
  coPartnerName: string | null;
  coPartnerEmail: string | null;
}

export interface Enterprise {
  id: string;
  name: string;
}

export interface DropdownOption {
  id: string;
  name: string;
}

export interface ZendeskTicket {
  id: number;
  url: string;
  subject: string;
  description: string;
  status: string;
  priority: string | null;
  type: string | null;
  created_at: string;
  updated_at: string;
  requester_id: number;
  submitter_id: number;
  assignee_id: number | null;
  organization_id: number | null;
  group_id: number | null;
  tags: string[];
  custom_fields: Array<{
    id: number;
    value: any;
  }>;
}

export interface ZendeskComment {
  id: number;
  type: string;
  author_id: number;
  body: string;
  html_body: string;
  plain_body: string;
  public: boolean;
  created_at: string;
  attachments: Array<{
    id: number;
    file_name: string;
    content_url: string;
    content_type: string;
    size: number;
  }>;
}
