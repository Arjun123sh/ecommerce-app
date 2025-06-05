import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useProducts } from '@/contexts/ProductsContext';
import { styles } from '@/contants';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }:any) => {
  return (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: product.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text style={styles.productPrice}>
          ${product.price?.toFixed(2) || '0.00'}
        </Text>
        
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => onAddToCart(product)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.wishlistBtn, isInWishlist && styles.wishlistBtnActive]}
            onPress={() => onAddToWishlist(product)}
          >
            <Text style={styles.wishlistIcon}>
              {isInWishlist ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { 
    products, 
    loading, 
    error, 
    addToCart, 
    addToWishlist, 
    removeFromWishlist,
    isInWishlist 
  } = useProducts();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleAddToWishlist = (product:any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading && products.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={onRefresh}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopVibe</Text>
        <Text style={styles.headerSubtitle}>Discover amazing products</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={addToCart}
            onAddToWishlist={handleAddToWishlist}
            isInWishlist={isInWishlist(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
