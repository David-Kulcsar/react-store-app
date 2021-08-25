import { action, computed, makeObservable, observable } from "mobx";
import { User } from "../model/User";
import { BaseStore } from "./BaseStore";
import { RootStore } from "./RootStore";

export class UserStore extends BaseStore<User> {
    public rootStore: RootStore;
    public endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/users';

    public id: string = '';
    public setId = (id: string) => {this.id = id; };

    public companyId: string = '1';
    public setCompanyId = (companyId: string) => {this.companyId = companyId; };

    public searchTerm: string = '';
    public setSearchTerm(searchTerm: string) { this.searchTerm = searchTerm; }

    public newAvatarUrl: string = '';
    public setNewAvatarUrl(newAvatarUrl: string) { this.newAvatarUrl = newAvatarUrl; }

    public newUserName: string = '';
    public setNewUserName(newUserName: string) { this.newUserName = newUserName; }

    public onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setSearchTerm(event.target.value);
    };
  
    public onNewAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewAvatarUrl(event.target.value);
    };
  
    public onNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewUserName(event.target.value);
    };
  
    public get filteredItems(): User[] {
        let items = this.items;
        items = items.filter(user => user.username
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        );
        return items;
    }

    public onEdit = (id: string) => {
        const item = this.items.find( user => user.id === id);
        this.setId(id);
        this.setNewUserName(item.username);
        this.setNewAvatarUrl(item.avatar);
    }

    public onCancel = () => {
        this.setId('');
        this.setNewUserName('');
        this.setNewAvatarUrl('');
        this.setCompanyId('1');
    }

    public onSaveUser = () => {
        if(!this.newUserName || !this.newAvatarUrl) {
            alert("Please fill every field");
            return;
        }
        const newItem = {
            username: this.newUserName, 
            avatar: this.newAvatarUrl,
            id: this.id,
            companyId: this.companyId  
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
            newAvatarUrl: observable,
            newUserName: observable,
            onNewAvatarChange: action.bound,
            onNewUserNameChange: action.bound,
            onEdit: action.bound,
            onCancel: action.bound,
        });
        this.getList().then(users => this.setItems(users));
    }
}
