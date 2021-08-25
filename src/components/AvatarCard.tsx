import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface CardItem {
    id: string;
    avatar?: string;
    title?: string;
    description?:  string;
}

interface AvatarCardProps {
    item: CardItem;
    onDelete: (id: string) => Promise<void>;
    onEdit: (id: string) => void;
}

export function AvatarCard(props: AvatarCardProps) {
    const { item, onDelete, onEdit } = props;
    return (
        <Card className='grid-item' raised style={{ maxWidth: 200 }}>
            <CardActionArea>
                { item.avatar && (
                    <CardMedia
                        component='img'
                        image={item.avatar}
                        title="Contemplative Reptile"
                    />
                )}
                <CardContent>
                    {item.title && (
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                    )}
                    {item.description && (
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => onEdit(item.id)}
                > Edit </Button>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => onDelete(item.id)}
                > Delete </Button>
                
            </CardActions>
        </Card>
    );
}