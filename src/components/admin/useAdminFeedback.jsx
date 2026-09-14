'use client';
import React, { useState, useCallback } from 'react';
import {
  Snackbar, Alert, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button,
} from '@mui/material';

/**
 * Nette vervanging voor alert() en window.confirm() in de admin:
 * - notify(bericht, severity) toont een toast (Snackbar)
 * - confirm(bericht, opties) toont een dialoog en resolvet naar true/false
 * Render {feedback} één keer onderaan de pagina.
 */
export function useAdminFeedback() {
  const [snack, setSnack] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  const notify = useCallback((message, severity = 'success') => {
    setSnack({ message, severity });
  }, []);

  const confirm = useCallback((message, options = {}) => {
    return new Promise((resolve) => {
      setConfirmState({
        message,
        title: options.title || 'Weet je het zeker?',
        confirmLabel: options.confirmLabel || 'Bevestigen',
        confirmColor: options.confirmColor || 'error',
        resolve,
      });
    });
  }, []);

  const closeConfirm = (result) => {
    confirmState?.resolve(result);
    setConfirmState(null);
  };

  const feedback = (
    <>
      <Snackbar
        open={!!snack}
        autoHideDuration={5000}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {snack ? (
          <Alert
            severity={snack.severity}
            variant="filled"
            onClose={() => setSnack(null)}
            sx={{ boxShadow: 3 }}
          >
            {snack.message}
          </Alert>
        ) : undefined}
      </Snackbar>

      <Dialog open={!!confirmState} onClose={() => closeConfirm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{confirmState?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ whiteSpace: 'pre-line' }}>
            {confirmState?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => closeConfirm(false)} color="inherit">
            Annuleren
          </Button>
          <Button
            onClick={() => closeConfirm(true)}
            variant="contained"
            color={confirmState?.confirmColor}
            autoFocus
          >
            {confirmState?.confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return { notify, confirm, feedback };
}
