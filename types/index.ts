export interface Producer {
    id: string
    name: string
    photo: string
    phone: string
    lat: number
    lon: number
    country: string
    created_at: string
  }
  
  export interface Visit {
    id?: string
    producer_id: string
    user_id: number
    date: string
    lat: number
    lon: number
    observations: string
    photo?: string
  }
  