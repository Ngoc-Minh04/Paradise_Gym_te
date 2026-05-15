import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Button } from 'react-native';
import { api } from '../../services/api';
import { formatDate, scheduleStatusLabel, unwrapData } from '../../utils/data';

export default function PTScheduleScreen() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [errorText, setErrorText] = useState('');

  const fetchSchedules = async () => {
    try {
      setErrorText('');
      const res = await api.get('/pt/schedules');
      setSchedules(unwrapData(res, []));
    } catch (error) {
      setErrorText(error.response?.data?.message || 'Không tải được lịch dạy từ backend.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [noteTap, setNoteTap] = useState('');
  const [noteDinhDuong, setNoteDinhDuong] = useState('');

  const openNoteModal = (item) => {
    setSelectedSchedule(item);
    setNoteTap(item.ghi_chu_tap || '');
    setNoteDinhDuong(item.ghi_chu_dinh_duong || '');
    setModalVisible(true);
  };

  const saveNotes = async () => {
    if (!selectedSchedule) return;
    setActionLoadingId(selectedSchedule.id);
    try {
      await api.put(`/pt/schedules/${selectedSchedule.id}/notes`, {
        ghi_chu_tap: noteTap,
        ghi_chu_dinh_duong: noteDinhDuong
      });
      setModalVisible(false);
      await fetchSchedules();
      Alert.alert('Thành công', 'Đã lưu ghi chú.');
    } catch (error) {
      Alert.alert('Lỗi', error.response?.data?.message || 'Không thể lưu ghi chú.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const confirmSchedule = (id) => {
    Alert.alert('Xác nhận buổi tập', 'Xác nhận học viên đã hoàn thành buổi tập này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xác nhận',
        onPress: async () => {
          setActionLoadingId(id);
          try {
            await api.put(`/pt/schedules/${id}/confirm`);
            await fetchSchedules();
          } catch (error) {
            Alert.alert('Lỗi', error.response?.data?.message || 'Không thể xác nhận buổi tập.');
          } finally {
            setActionLoadingId(null);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchSchedules(); }} colors={['#1D9336']} />}
    >
      <Text style={styles.title}>Lịch dạy</Text>
      <Text style={styles.subtitle}>Dữ liệu lấy từ API /pt/schedules và được backend lọc theo PT đang đăng nhập.</Text>

      {loading ? <ActivityIndicator color="#1D9336" size="large" /> : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

      {!loading && schedules.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>Chưa có lịch dạy nào trong hệ thống.</Text></View>
      ) : schedules.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.time}>{formatDate(item.ngay_tap)} • {item.gio_bat_dau} - {item.gio_ket_thuc}</Text>
          <Text style={styles.name}>{item.ten_hoi_vien || 'Chưa có học viên'}</Text>
          <Text style={styles.meta}>Còn lại: {item.buoi_con_lai ?? 'Chưa rõ'} buổi • {item.loai_buoi === 'ca_nhan' ? 'Cá nhân' : 'Nhóm'}</Text>
          <Text style={styles.status}>{scheduleStatusLabel(item.trang_thai)}</Text>
          
          <View style={styles.notesContainer}>
            <Text style={styles.noteTitle}>🏋️ Tập gì:</Text>
            <Text style={styles.noteContent}>{item.ghi_chu_tap || '(Chưa có ghi chú)'}</Text>
            <Text style={styles.noteTitle}>🍎 Ăn gì:</Text>
            <Text style={styles.noteContent}>{item.ghi_chu_dinh_duong || '(Chưa có ghi chú)'}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.miniButton, { backgroundColor: '#0284c7' }]} onPress={() => openNoteModal(item)}>
              <Text style={styles.buttonText}>Ghi chú tập & ăn</Text>
            </TouchableOpacity>

            {item.trang_thai === 'cho_tap' ? (
              <TouchableOpacity style={styles.miniButton} onPress={() => confirmSchedule(item.id)} disabled={actionLoadingId === item.id}>
                {actionLoadingId === item.id ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>Xác nhận xong</Text>}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ))}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ghi chú buổi tập</Text>
            
            <Text style={styles.label}>🏋️ Hôm nay tập gì?</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: Squat 4 hiệp, Deadlift..."
              value={noteTap}
              onChangeText={setNoteTap}
              multiline
            />

            <Text style={styles.label}>🍎 Hôm nay ăn gì?</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: Ăn nhiều đạm, 2 quả trứng..."
              value={noteDinhDuong}
              onChangeText={setNoteDinhDuong}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#94a3b8' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#1D9336' }]} onPress={saveNotes}>
                <Text style={styles.modalBtnText}>Lưu ghi chú</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, backgroundColor: '#f7f9ff', padding: 20, paddingBottom: 32 },
  title: { fontSize: 24, fontWeight: '800', color: '#181c20', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#5c6758', marginBottom: 18 },
  error: { color: '#dc2626', fontWeight: '600', marginBottom: 12 },
  empty: { backgroundColor: '#fff', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#ebeef3' },
  emptyText: { color: '#7a8775', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#ebeef3', borderLeftWidth: 5, borderLeftColor: '#1D9336', marginBottom: 12 },
  time: { color: '#1D9336', fontSize: 13, fontWeight: '800', marginBottom: 6 },
  name: { color: '#181c20', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  meta: { color: '#3f4a3c', fontWeight: '500', marginBottom: 8 },
  status: { color: '#1D9336', fontWeight: '800' },
  notesContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    gap: 4,
  },
  noteTitle: { fontSize: 12, fontWeight: '700', color: '#475569' },
  noteContent: { fontSize: 13, color: '#1e293b', marginBottom: 4 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  miniButton: { flex: 1, backgroundColor: '#1D9336', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 13 },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#181c20', marginBottom: 16, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 8, marginTop: 10 },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 24 },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  modalBtnText: { color: '#fff', fontWeight: '800' },
});
