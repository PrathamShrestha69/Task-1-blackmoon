'use client'

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }))
  }

  const handleDecreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button variant="contained" href="/shop">
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: 80, height: 80, objectFit: 'contain' }}
                        />
                        <Typography>{item.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">Rs. {item.price.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">Rs. {(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleRemove(item.id)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Total</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Rs. {totalPrice.toFixed(2)}</Typography>
              </Box>
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>Checkout</Button>
              <Button variant="outlined" fullWidth sx={{ mb: 1 }} href="/shop">Continue Shopping</Button>
              <Button variant="text" fullWidth color="error" onClick={handleClearCart}>Clear Cart</Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  )
}
