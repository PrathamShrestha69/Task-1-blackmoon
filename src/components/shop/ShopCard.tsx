import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonIcon from '../lib/ui/ButtonIcon';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';

type CardProps = {
  id?: number,
  image?: string,
  title?: string,
  desc?: string,
  price?: number
}

export default function ShopCard(
  { id, image, title, desc, price }: CardProps
) {

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (id && title && price) {
      dispatch(addToCart({
        id, title, price, image: image || ''
      }))
      console.log('added to cart');

    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: '10px' }}>
        <div className='ml-2'>
          Rs. {price}
        </div>

        <ButtonIcon variant={'contained'} startIcon={<ShoppingBasketIcon />} text={'Add to Cart'} color={'primary'} onClick={handleAddToCart} />
      </CardActions>
    </Card>
  );
}
