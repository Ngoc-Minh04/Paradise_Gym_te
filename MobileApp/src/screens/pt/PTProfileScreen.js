import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, RefreshControl, ScrollView,
  StatusBar, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import {
  ChevronRight, FileText, LogOut,
  Bell, Calendar, User, QrCode,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import ProfileAvatar from '../../components/ProfileAvatar';
import { formatDateTime, unwrapData } from '../../utils/data';
import { useAuthStore } from '../../store/useAuthStore';

// ── Màu sắc ────────────────────────────────────────────────
const G = {
  primary: '#1D9336',
  white: '#ffffff',
  gray50: '#f8faf8',
  gray100: '#f0f4f0',
  gray200: '#e4ebe4',
  gray300: '#cdd8cd',
  gray400: '#9cad9c',
  gray900: '#141c14',
  danger: '#dc2626',
  dangerLight: '#fef2f2',
};

// ── Component: Menu row ─────────────────────────────────────
function MenuRow({ icon: Icon, iconBg, iconColor, label, sublabel, onPress, danger }) {
  return (
    <TouchableOpacity
      style={menuStyles.row}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[menuStyles.iconBox, { backgroundColor: iconBg || G.gray100 }]}>
        <Icon color={iconColor || G.gray900} size={18} strokeWidth={2} />
      </View>
      <View style={menuStyles.labelBox}>
        <Text style={[menuStyles.label, danger && { color: G.danger }]}>{label}</Text>
        {sublabel ? <Text style={menuStyles.sublabel} numberOfLines={1}>{sublabel}</Text> : null}
      </View>
      <ChevronRight color={G.gray300} size={18} strokeWidth={2} />
    </TouchableOpacity>
  );
}

const menuStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: G.white,
    borderBottomWidth: 1,
    borderBottomColor: G.gray100,
  },
  iconBox: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  labelBox: { flex: 1 },
  label: { fontSize: 14, fontWeight: '700', color: G.gray900 },
  sublabel: { fontSize: 11, color: G.gray400, marginTop: 1 },
});

export default function PTProfileScreen() {
  const navigation = useNavigation();
  const { logout } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const profileRes = await api.get('/members/me/profile');
      setProfile(unwrapData(profileRes, null));
    } catch (error) {
      console.error('[PTProfileScreen] Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={G.white} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} colors={[G.primary]} />}
      >
        <Text style={styles.title}>Cá nhân</Text>

        {loading ? (
          <ActivityIndicator color={G.primary} size="large" style={{ marginTop: 40 }} />
        ) : (
          <>
            {profile && (
              <View style={styles.profileCard}>
                <ProfileAvatar uri={profile.avatar_url} name={profile.ho_ten} size={80} />
                <Text style={styles.name}>{profile.ho_ten}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Huấn luyện viên chuyên nghiệp</Text>
                </View>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tài khoản & Bảo mật</Text>
              <View style={styles.menuGroup}>
                <MenuRow 
                  icon={User} iconBg="#e0f2fe" iconColor="#0284c7"
                  label="Thông tin cá nhân" sublabel="Chỉnh sửa hồ sơ HLV"
                  onPress={() => {}} 
                />
                <MenuRow 
                  icon={FileText} iconBg="#fef3c7" iconColor="#d97706"
                  label="Quy định phòng tập" sublabel="Nội quy dành cho HLV & Hội viên"
                  onPress={() => navigation.navigate('Regulations')} 
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hệ thống</Text>
              <View style={styles.menuGroup}>
                <MenuRow 
                  icon={Bell} iconBg="#f0fdf4" iconColor="#16a34a"
                  label="Thông báo" sublabel="Lịch sử thông báo hệ thống"
                  onPress={() => {}} 
                />
                <MenuRow 
                  icon={LogOut} iconBg={G.dangerLight} iconColor={G.danger}
                  label="Đăng xuất" danger
                  onPress={() => logout()} 
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: G.gray50 },
  content: { paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: G.gray900, marginTop: 60, marginHorizontal: 20, marginBottom: 20 },
  profileCard: { 
    backgroundColor: G.white, 
    marginHorizontal: 20, 
    padding: 24, 
    borderRadius: 24, 
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, elevation: 5,
    marginBottom: 24
  },
  name: { fontSize: 20, color: G.gray900, fontWeight: '800', marginTop: 16 },
  badge: { backgroundColor: '#f0fdf4', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  badgeText: { fontSize: 11, color: G.primary, fontWeight: '700' },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: G.gray400, textTransform: 'uppercase', letterSpacing: 1, marginHorizontal: 24, marginBottom: 10 },
  menuGroup: { backgroundColor: G.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: G.gray100 },
});
