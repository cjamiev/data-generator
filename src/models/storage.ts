export interface Email {
  id: string;
}

export interface Street {
  id: string;
}

export interface Location {
  code: string;
  state: string;
  cities: string;
}

export interface Name {
  id: string;
  is_first_name: boolean;
  is_last_name: boolean;
  gender: string;
}

export interface Word {
  id: string;
  type: string;
}