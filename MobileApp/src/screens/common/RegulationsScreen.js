import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, RefreshControl, ScrollView,
  StatusBar, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import { ChevronLeft, FileText, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';

const G = {
  primary: '#1D9336',
  white: '#ffffff',
  gray50: '#f8faf8',
  gray100: '#f0f4f0',
  gray200: '#e4ebe4',
  gray400: '#9cad9c',
  gray700: '#2d3c2d',
  gray900: '#141c14',
};

export default function RegulationsScreen() {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRegulations = async () => {
    try {
      const res = await api.get('/config/quy_dinh_phong_tap');
      if (res.data?.success) {
        setContent(res.data.data.gia_tri);
      }
    } catch (err) {
      console.error('[RegulationsScreen] fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRegulations();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={G.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color={G.gray900} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quy định phòng tập</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[G.primary]} />
        }
      >
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={G.primary} />
            <Text style={styles.loadingText}>Đang tải quy định...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.infoBanner}>
              <Info color={G.primary} size={18} strokeWidth={2.5} />
              <Text style={styles.infoText}>Vui lòng tuân thủ các quy định dưới đây để đảm bảo môi trường tập luyện văn minh và an toàn.</Text>
            </View>

            <View style={styles.contentBox}>
              <View style={styles.iconCircle}>
                <FileText color={G.primary} size={32} strokeWidth={2} />
              </View>
              
              <Text style={styles.regContent}>
                {content || 'Chưa có nội dung quy định.'}
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Paradise Gym - Nâng tầm vóc dáng Việt</Text>
              <Text style={styles.footerSubText}>Cập nhật mới nhất từ hệ thống</Text>
            </View>
          </View>
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: G.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: G.gray900,
  },
  scrollContent: { padding: 20 },
  loadingBox: { paddingVertical: 100, alignItems: 'center' },
  loadingText: { marginTop: 12, color: G.gray400, fontWeight: '500' },
  card: {
    backgroundColor: G.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#f0fdf4',
    padding: 14,
    borderRadius: 16,
    gap: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#166534',
    lineHeight: 18,
    fontWeight: '500',
  },
  contentBox: { alignItems: 'center' },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  regContent: {
    fontSize: 15,
    lineHeight: 26,
    color: G.gray700,
    textAlign: 'left',
    width: '100%',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: G.gray100,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '700',
    color: G.primary,
  },
  footerSubText: {
    fontSize: 11,
    color: G.gray400,
    marginTop: 4,
  },
});
