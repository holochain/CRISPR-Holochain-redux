export const validationRules = {
  validateEntryCreate: [
  ],
  validateEntryModify: [
    {
      group: 'Rule Set 1',
      rules: [
        {
          rule: 'Any Agent can update entry',
          template: 'any-agent-update',
          selected: true
        },
        {
          rule: 'Only allow Agent who authored entry allowed to update',
          template: 'only-agent-update',
          selected: false
        },
        {
          rule: 'Entry can not be updated',
          template: 'not-updateable',
          selected: false
        }
      ]
    },
    {
      group: 'Rule Set 2',
      rules: [
        {
          rule: 'Another rule',
          template: 'another-rule',
          selected: false
        },
        {
          rule: 'Another rule about updating',
          template: 'another-rule-2',
          selected: false
        }
      ]
    }
  ],
  validateEntryDelete: [
    {
      group: 'Rule Set 1',
      rules: [
        {
          rule: 'Any Agent can delete entry',
          template: 'any-agent-delete',
          selected: true
        },
        {
          rule: 'Only allow Agent who authored entry allowed to delete',
          template: 'only-agent-delete',
          selected: false
        },
        {
          rule: 'Entry can not be deleted',
          template: 'not-deleteable',
          selected: false
        }
      ]
    }
  ],
  validateLinkAdd: [
  ],
  validateLinkRemove: [
  ]
}
