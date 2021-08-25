import { User } from "../model/User"
import { CardList } from "./CardList"
import { AvatarCard } from "./AvatarCard";
import { UserStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";

interface UserCardListProps {
    store: UserStore;
}

export const UserCardList = observer((props: UserCardListProps) => {
    const { 
        searchTerm, 
        onSearch,
        newAvatarUrl,
        newUserName,
        onSaveUser, 
        filteredItems: items,
        onNewUserNameChange,
        onNewAvatarChange,
        onDelete,
        onCancel,
        onEdit
    } = props.store;

    return (
        <div>
           <input placeholder='Search...' value={searchTerm} onChange={onSearch}></input>          
            <div>
                <input placeholder='Avatar Url' value={newAvatarUrl} onChange={onNewAvatarChange}></input>
                <input placeholder='User Name' value={newUserName} onChange={onNewUserNameChange}></input>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSaveUser}>Save</button>
            </div>  
            <CardList 
                items={items} 
                itemRenderer={(item: User) => (
                    <AvatarCard 
                        item={{ id: item.id, title: item.username, avatar: item.avatar }} 
                        onDelete={onDelete}
                        onEdit={onEdit}
                        key={item.id} 
                    />
                )}
            />
        </div>
    )
})