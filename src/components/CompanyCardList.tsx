import { CardList } from "./CardList"
import { AvatarCard } from "./AvatarCard";
import { Company } from "../model/Company";
import { CompanyStore } from "../stores/CompanyStore";
import { observer } from "mobx-react-lite";
import { Button, TextField } from "@material-ui/core";

interface CompanyCardListProps {
    store: CompanyStore;
}

export const CompanyCardList = observer((props: CompanyCardListProps) => {
    const { 
        filteredItems: items, 
        onDelete,
        searchTerm,
        onSearch,
        onSaveCompany,
        onNameChange,
        name,
        onDescriptionChange,
        description,
        onEdit,
        onCancel
    } = props.store;

    const getUser = (companyId: string): string => {
        const users = props.store.rootStore.userStore.items.filter(user => user.companyId === companyId);
        if (users.length > 0) {
            return ' (' + users.length + ')'; // (2)
        } else {
            return '';
        }
    }

    return (
        <div>
            {/* <input placeholder='Search...' ></input> */}
            <TextField id="filled-search" label="Search..." type="search" variant="outlined" value={searchTerm} onChange={onSearch}/>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    value= {name}
                    variant="outlined"
                    onChange = {onNameChange}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={1}
                    value={description}
                    variant="outlined"
                    onChange = {onDescriptionChange}
                />
                <Button variant="contained" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={onSaveCompany}>Save</Button>
            </div>
            <CardList 
                items={items} 
                itemRenderer={(item: Company) => (
                    <AvatarCard 
                        item={{ id: item.id, title: item.name + getUser(item.id), description: item.description }} 
                        onDelete={onDelete}
                        onEdit={onEdit} 
                        key={item.id} 
                    />
                )}
            />
        </div>
    )
})