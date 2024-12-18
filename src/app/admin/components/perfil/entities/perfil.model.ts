export interface PerfilModel {
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    image?: string;
    password?: string;
    notification_token?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface CreatePerfilDto extends Omit<PerfilModel, 'id'>{}

export interface UpdatePerfilDto extends Partial<PerfilModel>{}