import { action, computed, makeObservable, observable } from "mobx";
import { Company } from "../model/Company";
import { BaseStore } from "./BaseStore";
import { RootStore } from "./RootStore";

export class CompanyStore extends BaseStore<Company> {
    public rootStore: RootStore;
    public endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies';

    

    public searchTerm: string = '';
    public setSearchTerm(searchTerm: string) { this.searchTerm = searchTerm; }
    public onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setSearchTerm(event.target.value);
    };

    public id: string = '';
    public setId = (id: string) => {this.id = id; };

    public name: string = '';
    public setName = (name: string) => { this.name = name; };

    public description: string = '';
    public setDescription = (description: string) => { this.description = description; };

    public onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setName(event.target.value);
    }

    public onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setDescription(event.target.value);
    }

    public get filteredItems(): Company[] {
        let items = this.items;
        items = items.filter(company => company.name
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        );
        return items;
    }

    public onEdit = (id: string) => {
        const item = this.items.find( company => company.id === id);
        this.setId(id);
        this.setName(item.name);
        this.setDescription(item.description);
    }

    public onCancel = () => {
        this.setId('');
        this.setName('');
        this.setDescription('');
    }

    public onSaveCompany = () => {
        if(!this.name || !this.description) {
            alert("Please fill every field");
            return;
        }
        const newItem = {
            name: this.name, 
            description: this.description,
            id: this.id
        };

        if(this.id){
            this.update(newItem);
        } else {
            this.create(newItem);
        }
        this.onCancel();
    }

    constructor(rootStore: RootStore) {
        super();
        this.rootStore = rootStore;
        makeObservable(this, {
            filteredItems: computed,
            searchTerm: observable,
            setSearchTerm: action.bound,
            name: observable,
            description: observable,
            onNameChange: action.bound,
            onDescriptionChange: action.bound,
            onEdit: action.bound,
            onCancel: action.bound
        });
        this.getList().then(company => this.setItems(company));
    }

    
}

