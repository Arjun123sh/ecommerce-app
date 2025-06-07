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
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { useProducts } from '@/contexts/ProductsContext';
import { LinearGradient } from 'expo-linear-gradient'; // If using Expo
// import LinearGradient from 'react-native-linear-gradient'; // If using react-native-linear-gradient

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 48 = 16 (container padding) + 16 (gap between cards)

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }:any) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[enhancedStyles.productCard, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={enhancedStyles.imageContainer}>
          <Image
            source={{ uri: product.image_uri || 'https://via.placeholder.com/200x200/f0f0f0/cccccc?text=Product' }}
            style={enhancedStyles.productImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={enhancedStyles.wishlistBtn}
            onPress={() => onAddToWishlist(product)}
          >
            <Text style={enhancedStyles.wishlistIcon}>
              {isInWishlist ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={enhancedStyles.productInfo}>
          <Text style={enhancedStyles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          
          <View style={enhancedStyles.priceContainer}>
            <Text style={enhancedStyles.productPrice}>
              ${product.price?.toFixed(2) || '0.00'}
            </Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Text style={enhancedStyles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={enhancedStyles.addToCartBtn}
            onPress={() => onAddToCart(product)}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={enhancedStyles.gradientBtn}
            >
              <Text style={enhancedStyles.addToCartText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
      <SafeAreaView style={enhancedStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
        <View style={enhancedStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={enhancedStyles.loadingText}>Loading amazing products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={enhancedStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
        <View style={enhancedStyles.errorContainer}>
          <Text style={enhancedStyles.errorIcon}>⚠️</Text>
          <Text style={enhancedStyles.errorText}>Oops! Something went wrong</Text>
          <Text style={enhancedStyles.errorSubtext}>{error}</Text>
          <TouchableOpacity style={enhancedStyles.retryBtn} onPress={onRefresh}>
            <Text style={enhancedStyles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={enhancedStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Enhanced Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
        style={enhancedStyles.header}
      >
        <View style={enhancedStyles.headerContent}>
          <Text style={enhancedStyles.headerTitle}>ShopVibe ✨</Text>
          <Text style={enhancedStyles.headerSubtitle}>Discover amazing products just for you</Text>
        </View>
      </LinearGradient>

      {/* Products Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={enhancedStyles.productList}
        columnWrapperStyle={enhancedStyles.row}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#8B5CF6']}
            tintColor="#8B5CF6"
          />
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
          <View style={enhancedStyles.emptyContainer}>
            <Text style={enhancedStyles.emptyIcon}>🛍️</Text>
            <Text style={enhancedStyles.emptyText}>No products available</Text>
            <Text style={enhancedStyles.emptySubtext}>Check back later for new arrivals!</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const enhancedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Header Styles
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Product List Styles
  productList: {
    padding: 16,
    paddingTop: 24,
  },
  row: {
    justifyContent: 'space-between',
  },

  // Product Card Styles
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: '#F1F5F9',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIcon: {
    fontSize: 18,
  },

  // Product Info Styles
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#64748B',
    fontWeight: '500',
  },

  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryBtn: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
});