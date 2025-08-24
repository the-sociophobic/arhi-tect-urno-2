export type StateType = {
  hoveredIds: string[]
  setHoveredIds: (hoveredIds: string[]) => void

  selectedIds: string[]
  setSelectedIds: (selectedIds: string[]) => void

  mouseClicked: boolean
  setMouseClicked: (mouseClicked: boolean) => void
}


export type initializerFnType = (
  partial: StateType | Partial<StateType> | ((state: StateType) => StateType | Partial<StateType>),
  replace?: false | undefined
) => void


export const initializer = (set: initializerFnType) => ({
  hoveredIds: [],
  setHoveredIds: (hoveredIds: string[]) => set({ hoveredIds }),

  selectedIds: [],
  setSelectedIds: (selectedIds: string[]) => set({ selectedIds }),

  mouseClicked: false,
  setMouseClicked: (mouseClicked: boolean) => set({ mouseClicked }),

})
