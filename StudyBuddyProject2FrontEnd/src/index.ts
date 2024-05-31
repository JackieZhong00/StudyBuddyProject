

export type currentUser = {
  username: string
  pictureUpload: string
  locations: string[]
  dates: string[]
  promptResponses: string[]
  _id: string
}
export type UserData = {
  email: string
  username: string
  dates: Date[]
  locations: string[]
  contactInfo: string
  promptResponses: string[]
  pictureUpload: string
  _id: string
}

export type ProfileFormData = {
  date1: Date
  date2: Date
  date3: Date
  date4: Date
  location1: string
  location2: string
  location3: string
  location4: string
  contactInfo: string
  careerPrompt: string
  enviroPrompt: string
  traitsPrompt: string
  hobbiesPrompt: string
}

