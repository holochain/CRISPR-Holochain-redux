export const curatedFieldNames = [
  { anchor: 'name', fieldName: 'Full Name', fieldType: 'singleLineText' },
  { anchor: 'given_name', fieldName: 'Given Name', fieldType: 'singleLineText' },
  { anchor: 'family_name', fieldName: 'Family Name', fieldType: 'singleLineText' },
  { anchor: 'middle_name', fieldName: 'Middle Name', fieldType: 'singleLineText' },
  { anchor: 'nickname', fieldName: 'Nick Name', fieldType: 'singleLineText' },
  { anchor: 'preferred-username', fieldName: 'Handle', fieldType: 'singleLineText' },
  { anchor: 'profile-picture', fieldName: 'Profile Picture', fieldType: 'image' },
  { anchor: 'avatar', fieldName: 'Avatar', fieldType: 'thumbnail' },
  { anchor: 'biography', fieldName: 'Bio', fieldType: 'multiLineText' },
  { anchor: 'website', fieldName: 'Website', fieldType: 'singleLineText' },
  { anchor: 'email', fieldName: 'Email', fieldType: 'singleLineText' },
  { anchor: 'birth-date', fieldName: 'Birth Date', fieldType: 'singleLineText' },
  { anchor: 'time-zone', fieldName: 'Time Zone', fieldType: 'singleLineText' },
  { anchor: 'locale', fieldName: 'Locale', fieldType: 'singleLineText' },
  { anchor: 'phone-number', fieldName: 'Phone Number', fieldType: 'singleLineText' },
  { anchor: 'address', fieldName: 'Email', fieldType: 'singleLineText' }
]

export const customFieldNames = [
  { anchor: 'cats-name', fieldName: "Cat's Name", fieldType: 'singleLineText' },
  { anchor: 'cats-history', fieldName: "Cat's History", fieldType: 'multiLineText' },
  { anchor: 'stage-name', fieldName: 'Stage Name', fieldType: 'singleLineText' },
  { anchor: 'mixes', fieldName: 'Mixes', fieldType: 'playlist' }
]

export const fieldNames = [...new Set([...curatedFieldNames, ...customFieldNames])]
