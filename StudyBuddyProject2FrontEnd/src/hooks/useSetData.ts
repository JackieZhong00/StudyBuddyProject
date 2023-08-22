import { create } from 'zustand'

interface SetDataStore {
  userProfile: {
    pictureUpload: string
    locations: string[]
    dates: Date[]
    promptResponses: string[]
  }
  setUserProfile: ( data:{
    pictureUpload: string,
    locations: string[],
    dates: Date[],
    promptResponses: string[]}
  ) => void
}

const useSetData = create<SetDataStore>((set) => ({
  userProfile: {
    pictureUpload: '',
    locations: [''],
    dates: [new Date()],
    promptResponses: [''],
  },
  setUserProfile: (data: {
    pictureUpload: string
    locations: string[]
    dates: Date[]
    promptResponses: string[]
  }) => set({ userProfile: data}),
}))

export default useSetData
