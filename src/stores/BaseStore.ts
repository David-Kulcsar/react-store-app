import { action, makeObservable, observable } from "mobx";

export abstract class BaseStore<T extends { id?: string }> {
    public endpoint: string = '';

    public items: T[] = [];
    public setItems(items: T[]) { this.items = items; }

    public async getList(): Promise<T[]> {
        const result = await fetch(this.endpoint);
        const items = await result.json();
        return items;
    }

    public async create(data: T): Promise<T> {
        try {
            const result = await fetch(
                this.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );
            const user = await result.json();
            this.setItems([ user, ...this.items ]);
            return user;
        } catch(err) {
            console.error(err);
        }
    }

    public async update(data: T): Promise<T> {
        try {
            const result = await fetch(
                `${this.endpoint}/${data.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );
            const user = await result.json();
            const oldItems = this.items.filter( item => item.id !== data.id);
            this.setItems([ user, ...oldItems ]);
            return user;
        } catch(err) {
            console.error(err);
        }
    }

    public onDelete = async (id: string): Promise<void> => {
        try {
            const result = await fetch(
                `${this.endpoint}/${id}`, {
                    method: 'DELETE',
                }
            );
            await result.json();
            this.setItems(this.items.filter(item => item.id !== id));
        } catch(err) {
            console.error(err);
        }
    }

    constructor() {
        makeObservable(this, {
            items: observable,
            setItems: action.bound
        });
    }
}
