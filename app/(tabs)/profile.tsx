import { styles } from '@/contants';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ProfileOption = ({ icon, title, onPress }:any) => (
  <TouchableOpacity style={styles.profileOption} onPress={onPress}>
    <View style={styles.optionLeft}>
      <Text style={styles.optionIcon}>{icon}</Text>
      <Text style={styles.optionTitle}>{title}</Text>
    </View>
    <Text style={styles.optionArrow}>›</Text>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        <View style={styles.profileOptions}>
          <ProfileOption icon="📋" title="Order History" />
          <ProfileOption icon="📍" title="Addresses" />
          <ProfileOption icon="💳" title="Payment Methods" />
          <ProfileOption icon="🔔" title="Notifications" />
          <ProfileOption icon="❓" title="Help & Support" />
          <ProfileOption icon="⚙️" title="Settings" />
          <ProfileOption icon="🚪" title="Sign Out" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
