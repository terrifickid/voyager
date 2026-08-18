import { user } from '$lib/stores/user.svelte.js';

const NO_SIGNAL =
  'User has not set travel preferences yet. ' +
  'Gently encourage them to set their preferences to receive tailored recommendations.';

function isEmptyForm(f) {
  return (
    f.archetype == null &&
    f.tags.length === 0 &&
    f.budget == null &&
    (f.note == null || f.note.trim() === '')
  );
}

const userContextMessage = $derived.by(() => {
  const p = user.preferences;
  if (isEmptyForm(p.form)) {
    return { role: 'system', content: NO_SIGNAL };
  }
  const payload = {
    form: {
      archetype: p.form.archetype,
      tags: [...p.form.tags],
      budget: p.form.budget,
      note: p.form.note,
    },
    personality: { ...p.personality },
    type: p.type ? { id: p.type.id, label: p.type.label, icon: p.type.icon } : null,
  };
  return {
    role: 'system',
    content: 'User travel preferences (JSON):\n```json\n' + JSON.stringify(payload) + '\n```',
  };
});

export function getUserContextMessage() {
  return userContextMessage;
}

export function getUserContextSystemText() {
  return userContextMessage.content;
}