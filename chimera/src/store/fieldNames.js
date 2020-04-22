export const curatedFieldNames = [
  {
    anchor: 'name',
    fieldName: 'Full Name',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'given-name',
    fieldName: 'Given Name',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'family-name',
    fieldName: 'Family Name',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'middle-name',
    fieldName: 'Middle Name',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'nickname',
    fieldName: 'Nick Name',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'preferred-username',
    fieldName: 'Handle',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'profile-picture',
    fieldName: 'Profile Picture',
    fieldType: 'String',
    ui: 'thumbnail'
  },
  {
    anchor: 'avatar',
    fieldName: 'Avatar',
    fieldType: 'String',
    ui: 'thumbnail'
  },
  {
    anchor: 'biography',
    fieldName: 'Bio',
    fieldType: 'String',
    ui: 'textarea'
  },
  {
    anchor: 'website',
    fieldName: 'Website',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'email',
    fieldName: 'Email',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'birth-date',
    fieldName: 'Birth Date',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'time-zone',
    fieldName: 'Time Zone',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'locale',
    fieldName: 'Locale',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'phone-number',
    fieldName: 'Phone Number',
    fieldType: 'String',
    ui: 'textfield'
  },
  {
    anchor: 'address',
    fieldName: 'Email',
    fieldType: 'String',
    ui: 'textfield'
  }
]

export const customFieldNames = [
  {
    anchor: 'Welcome',
    fieldName: 'Welcome',
    fieldType: 'String',
    ui: 'textarea'
  },
  {
    anchor: 'Welcome Image',
    fieldName: 'Welcome Image',
    fieldType: 'String',
    ui: 'image'
  },
  {
    anchor: 'Recent Projects',
    fieldName: 'Recent Projects',
    fieldType: 'String',
    ui: 'textarea'
  },
  {
    anchor: 'Recent Projects Image',
    fieldName: 'Recent Projects Image',
    fieldType: 'String',
    ui: 'image'
  },
  {
    anchor: 'Services',
    fieldName: 'Services',
    fieldType: 'String',
    ui: 'textarea'
  },
  {
    anchor: 'Services Image',
    fieldName: 'Services Image',
    fieldType: 'String',
    ui: 'image'
  },
  {
    anchor: 'About Me',
    fieldName: 'About Me',
    fieldType: 'String',
    ui: 'textarea'
  },
  {
    anchor: 'About Me Image',
    fieldName: 'About Me Image',
    fieldType: 'String',
    ui: 'image'
  },
  {
    anchor: 'Skills',
    fieldName: 'Skills',
    fieldType: 'String',
    ui: 'textarea'
  }
]

export const fieldNames = [...new Set([...curatedFieldNames, ...customFieldNames])]
