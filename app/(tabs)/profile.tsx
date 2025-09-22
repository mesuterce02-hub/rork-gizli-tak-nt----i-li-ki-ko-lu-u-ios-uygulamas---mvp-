import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Settings, HelpCircle, LogOut, Crown } from 'lucide-react-native';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  const handleHelpPress = () => {
    console.log('Help pressed');
  };

  const handleLogoutPress = () => {
    console.log('Logout pressed');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Profil</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <User color={PRIMARY_600} size={32} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Elif</Text>
              <View style={styles.subscriptionBadge}>
                <Crown color={PRIMARY_600} size={16} />
                <Text style={styles.subscriptionText}>Premium Üye</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSettingsPress}
              activeOpacity={0.7}
              testID="settings-button"
            >
              <View style={styles.menuIconContainer}>
                <Settings color={PRIMARY_600} size={24} />
              </View>
              <Text style={styles.menuText}>Ayarlar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleHelpPress}
              activeOpacity={0.7}
              testID="help-button"
            >
              <View style={styles.menuIconContainer}>
                <HelpCircle color={PRIMARY_600} size={24} />
              </View>
              <Text style={styles.menuText}>Yardım & Destek</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogoutPress}
              activeOpacity={0.7}
              testID="logout-button"
            >
              <View style={styles.menuIconContainer}>
                <LogOut color="#dc2626" size={24} />
              </View>
              <Text style={[styles.menuText, styles.logoutText]}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Gizli Takıntı v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: TEXT_900,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_900,
    marginBottom: 8,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PRIMARY_100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  subscriptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: PRIMARY_600,
  },
  menuContainer: {
    gap: 16,
    marginBottom: 32,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutItem: {
    marginTop: 16,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PRIMARY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: TEXT_900,
  },
  logoutText: {
    color: '#dc2626',
  },
  versionContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  versionText: {
    fontSize: 14,
    color: SECONDARY_600,
  },
});