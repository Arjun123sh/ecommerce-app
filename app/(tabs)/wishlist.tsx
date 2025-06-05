import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useProducts } from '@/contexts/ProductsContext';
import { styles } from '@/contants';

const WishlistItem = ({ item, onAddToCart, onRemove }:any) => {
  return (
    <View style={styles.wishlistItem}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }}
        style={styles.wishlistImage}
      />
      
      <View style={styles.wishlistInfo}>
        <Text style={styles.wishlistName}>{item.name}</Text>
        <Text style={styles.wishlistPrice}>${item.price?.toFixed(2)}</Text>
        
        <View style={styles.wishlistActions}>
          <TouchableOpacity 
            style={styles.addCartBtn}
            onPress={() => onAddToCart(item)}
          >
            <Text style={styles.addCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.removeWishBtn}
            onPress={() => onRemove(item.id)}
          >
            <Text style={styles.removeWishText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function WishlistScreen() {
  const { wishlist, addToCart, removeFromWishlist } = useProducts();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtext}>Save items you love for later!</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WishlistItem
              item={item}
              onAddToCart={addToCart}
              onRemove={removeFromWishlist}
            />
          )}
          contentContainerStyle={styles.wishlistList}
        />
      )}
    </SafeAreaView>
  );
}
