import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, RefreshControl, ScrollView,
  StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {
  ChevronLeft, Clock, Dumbbell, MapPin,
  CalendarCheck, User, Info
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { formatDate } from '../../utils/data';

// ── Màu sắc Paradise Gym ─────────────────────────────────
const G = {
  primary: '#1D9336',
  primaryLight: '#e6f4ea',
  white: '#ffffff',
  gray50: '#f8faf8',
  gray100: '#f0f4f0',
  gray200: '#e4ebe4',
  gray400: '#9cad9c',
  gray700: '#2d3c2d',
  gray900: '#141c14',
  warning: '#f59e0b',
  warningLight: '#fffbeb',
};

// ── Badge trạng thái ───────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = {
    cho_tap: { bg: G.warningLight, color: G.warning, label: 'Sắp tới' },
    da_tap: { bg: G.primaryLight, color: G.primary, label: 'Đã tập' },
    da_xac_nhan: { bg: G.primaryLight, color: G.primary, label: 'Đã hoàn thành' },
    da_huy: { bg: '#fef2f2', color: '#dc2626', label: 'Đã hủy' },
    vang: { bg: '#faf5ff', color: '#7c3aed', label: 'Vắng' },
  }[status] || { bg: G.gray100, color: G.gray400, label: status };

  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

export default function MemberPTScheduleScreen() {
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0 });

  const fetchData = useCallback(async () => {
    try {
      const [schedRes, profileRes] = await Promise.all([
        api.get('/pt/schedules'),
        api.get('/members/me/profile')
      ]);

      if (schedRes.data?.success) {
        // Chỉ lấy các buổi có PT
        const ptScheds = (schedRes.data.data || []).filter(s => s.ten_pt);
        setSchedules(ptScheds.sort((a, b) => b.ngay_tap.localeCompare(a.ngay_tap)));
      }

      if (profileRes.data?.success) {
        const activePT = profileRes.data.data?.dang_ky_pt?.[0];
        if (activePT) {
          setStats({
            total: activePT.so_buoi_dang_ky || 0,
            completed: activePT.so_buoi_da_tap || 0
          });
        }
      }
    } catch (err) {
      console.error('[PTScheduleScreen] error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const remaining = Math.max(0, stats.total - stats.completed);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={G.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={G.gray900} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch tập với PT</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} colors={[G.primary]} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color={G.primary} style={{ marginTop: 100 }} />
        ) : (
          <>
            {/* Thống kê buổi tập */}
            <View style={styles.statsCard}>
              <View style={styles.statsHeader}>
                <Dumbbell color={G.white} size={20} strokeWidth={2.5} />
                <Text style={styles.statsTitle}>Tiến độ tập luyện</Text>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.total}</Text>
                  <Text style={styles.statLabel}>Tổng số buổi</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.completed}</Text>
                  <Text style={styles.statLabel}>Đã tập</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: '#fef08a' }]}>{remaining}</Text>
                  <Text style={styles.statLabel}>Còn lại</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' }]} />
              </View>
            </View>

            {/* Banner hướng dẫn */}
            <View style={styles.infoBanner}>
              <Info color={G.primary} size={18} strokeWidth={2.5} />
              <Text style={styles.infoText}>Lịch tập này được sắp xếp bởi Huấn luyện viên của bạn. Vui lòng có mặt đúng giờ.</Text>
            </View>

            {/* Danh sách buổi tập */}
            <Text style={styles.listTitle}>Chi tiết các buổi tập</Text>
            
            {schedules.length === 0 ? (
              <View style={styles.emptyBox}>
                <CalendarCheck color={G.gray200} size={64} strokeWidth={1} />
                <Text style={styles.emptyText}>Chưa có lịch tập được sắp xếp</Text>
              </View>
            ) : (
              schedules.map((item, idx) => (
                <View key={item.id || idx} style={styles.sessionCard}>
                  <View style={styles.sessionDateBox}>
                    <Text style={styles.sessionDay}>{item.ngay_tap.split('-')[2]}</Text>
                    <Text style={styles.sessionMonth}>Th.{item.ngay_tap.split('-')[1]}</Text>
                  </View>

                  <View style={styles.sessionInfo}>
                    <View style={styles.sessionRow}>
                      <Clock color={G.gray400} size={14} />
                      <Text style={styles.sessionTime}>{item.gio_bat_dau} - {item.gio_ket_thuc}</Text>
                    </View>
                    <View style={styles.sessionRow}>
                      <User color={G.primary} size={14} />
                      <Text style={styles.sessionPt}>HLV: {item.ten_pt}</Text>
                    </View>
                    <View style={styles.sessionRow}>
                      <MapPin color={G.gray400} size={14} />
                      <Text style={styles.sessionLoc}>{item.chi_nhanh || 'Chi nhánh Paradise Gym'}</Text>
                    </View>

                    {/* Ghi chú tập luyện & dinh dưỡng */}
                    {(item.ghi_chu_tap || item.ghi_chu_dinh_duong) && (
                      <View style={styles.noteSection}>
                        {item.ghi_chu_tap && (
                          <View style={styles.noteItem}>
                            <Dumbbell color={G.primary} size={12} strokeWidth={2.5} />
                            <Text style={styles.noteText} numberOfLines={2}>
                              Tập gì: <Text style={{fontWeight:'700'}}>{item.ghi_chu_tap}</Text>
                            </Text>
                          </View>
                        )}
                        {item.ghi_chu_dinh_duong && (
                          <View style={[styles.noteItem, { marginTop: 4 }]}>
                            <Info color="#0284c7" size={12} strokeWidth={2.5} />
                            <Text style={styles.noteText} numberOfLines={2}>
                              Ăn gì: <Text style={{fontWeight:'700'}}>{item.ghi_chu_dinh_duong}</Text>
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>

                  <StatusBadge status={item.trang_thai} />
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: G.gray50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: G.white,
    borderBottomWidth: 1,
    borderBottomColor: G.gray100,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: G.gray50, alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: G.gray900 },
  scrollContent: { padding: 16 },

  // Stats Card
  statsCard: {
    backgroundColor: G.primary,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: G.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  statsHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  statsTitle: { color: G.white, fontSize: 16, fontWeight: '800' },
  statsGrid: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800', color: G.white },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4, fontWeight: '600' },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  progressContainer: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginTop: 24, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: G.white, borderRadius: 3 },

  infoBanner: {
    flexDirection: 'row',
    backgroundColor: G.primaryLight,
    padding: 12,
    borderRadius: 14,
    gap: 10,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: { flex: 1, fontSize: 12, color: G.primary, fontWeight: '600', lineHeight: 18 },

  listTitle: { fontSize: 16, fontWeight: '800', color: G.gray900, marginBottom: 12 },
  sessionCard: {
    backgroundColor: G.white,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, elevation: 2,
  },
  sessionDateBox: {
    width: 46, height: 52, borderRadius: 12,
    backgroundColor: G.gray50, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: G.gray100,
  },
  sessionDay: { fontSize: 18, fontWeight: '800', color: G.gray900 },
  sessionMonth: { fontSize: 10, fontWeight: '700', color: G.gray400 },
  sessionInfo: { flex: 1, gap: 4 },
  sessionRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sessionTime: { fontSize: 14, fontWeight: '700', color: G.gray900 },
  sessionPt: { fontSize: 13, fontWeight: '600', color: G.primary },
  sessionLoc: { fontSize: 11, color: G.gray400 },

  noteSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: G.gray100,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteText: {
    fontSize: 11,
    color: G.gray700,
    flex: 1,
  },

  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 10, fontWeight: '800' },

  emptyBox: { paddingVertical: 60, alignItems: 'center', gap: 12 },
  emptyText: { color: G.gray400, fontWeight: '600' },
});
