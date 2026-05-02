import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '@/constants';

interface Props {
  visible: boolean;
  title: string;
  placeholder?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export const InputModal = ({ visible, title, placeholder, onConfirm, onCancel }: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!visible) setValue('');
  }, [visible]);

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim());
      setValue('');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder ?? 'Escribe aquí...'}
            placeholderTextColor={colors.textSecondary}
            value={value}
            onChangeText={setValue}
            autoFocus
            onSubmitEditing={handleConfirm}
            returnKeyType="done"
          />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnConfirm, !value.trim() && styles.btnDisabled]}
              onPress={handleConfirm}
              disabled={!value.trim()}
            >
              <Text style={styles.btnConfirmText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.surface2,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btnCancel: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnCancelText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  btnConfirm: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnConfirmText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '600',
  },
});
