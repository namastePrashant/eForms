import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkListAPI } from '../../services/checklist';
import _ from 'lodash';
import items from 'src/views/items';

export const fetchCheckListById = createAsyncThunk(
  'checklist/fetchById',
  async (checkListId, thunkAPI) => {
    const response = await checkListAPI.fetchById(checkListId);
    return response;
  }
);

const initialState = {
  status: 'idle',
  data: {},
  initialData: {},
  allData: [],
};
const checkListSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    updateChecklist(state, action) {
      //
    },
    fetch: (state, action) => {
      state.allData = action.payload;
    },

    updateItemAnswer: (state, action) => {
      const { sectionIndex, itemIndex, itemId, value } = action.payload;
      state.data.sections[sectionIndex].items[itemIndex].hasError = false
      state.data.sections[sectionIndex].items[itemIndex].answer = value;
    },

    updateGroupItemAnswer: (state, action) => {
      const { sectionIndex, itemIndex, value, addMoreIndex, fieldIndex } = action.payload;
      state.data.sections[sectionIndex].items[itemIndex].hasError = false;
      if (state.data.sections[sectionIndex].items[itemIndex].answer) {
        state.data.sections[sectionIndex].items[itemIndex].answer[addMoreIndex] = value;
      } else {
        state.data.sections[sectionIndex].items[itemIndex].answer = [];
        state.data.sections[sectionIndex].items[itemIndex].answer[addMoreIndex] = value;
      }
      state.data.sections[sectionIndex].items[itemIndex].config.fields[fieldIndex].hasError = false;
      state.data.sections[sectionIndex].items[itemIndex].hasError = false;
    },

    updateSubSectionGroupItemAnswer: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, value, addMoreIndex, fieldIndex } = action.payload
      if (state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer) {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer[addMoreIndex] = value;
      } else {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer = [];
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer[addMoreIndex] = value;
      }
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[fieldIndex].hasError = false;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].hasError = false;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer[addMoreIndex][fieldIndex].hasError = false
    },

    addNewGroupItem: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, item } = action.payload;
      if (subSectionIndex !== undefined) {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer = [...state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer, item]
      } else {
        state.data.sections[sectionIndex].items[itemIndex].answer = [...state.data.sections[sectionIndex].items[itemIndex].answer, item]
      }

    },
    removeGroupItemAnswer: (state, action) => {
      const { sectionIndex, itemIndex, addMoreIndex } = action.payload;
      state.data.sections[sectionIndex].items[itemIndex].answer = state.data.sections[sectionIndex].items[itemIndex].answer?.filter((item, index) => index !== addMoreIndex)
    },

    removeSubSectionGroupItemAnswer: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, value, addMoreIndex } = action.payload;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer = state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer?.filter((item, index) => index !== addMoreIndex);
    },

    updateSubSectionItemAnswer: (state, action) => {

      const { sectionIndex, subSectionIndex, itemIndex, value } = action.payload;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].answer = value;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].hasError = false;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].isDirty = true;
    },

    updateAdditionalAnswer: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, fieldIndex, itemId, value } = action.payload;

      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[fieldIndex].answer = value;
      if (value !== '') {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[fieldIndex].hasError = false;
      }
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].hasError = false;

    },

    addDirtyCheck: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex } = action.payload;
      //this is dirty flag for section
      state.data.sections[sectionIndex].isDirty = true;


      if (subSectionIndex !== undefined && itemIndex !== undefined) {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].isDirty = true;
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].isDirty = true;
        return;
      }

      state.data.sections[sectionIndex].items[itemIndex].isDirty = true
    },

    removeDirtyCheck: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, clearAll, onlySubSection } = action.payload;

      //this is dirty flag for section
      state.data.sections[sectionIndex].isDirty = false;
      state.data.sections[sectionIndex].hasError = false;
      // state.data.sections[sectionIndex].sub_sections[subSectionIndex].isDirty = false;
      if (subSectionIndex?.toString()) {
        console.log('red inside subSectionIndex')
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items.forEach(subSectionItem => {
          subSectionItem.isDirty = false;
        })
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].isDirty = false;
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].hasError = false;

      }

      if (!onlySubSection) {
        if (state.data.sections[sectionIndex].sub_sections.length > 0) {
          state.data.sections[sectionIndex].sub_sections.forEach((subSec) => {
            subSec.isDirty = false;
            subSec.hasError = false;
          })
        }
      }

      state.data.sections[sectionIndex].items.forEach(sectionItem => {
        sectionItem.isDirty = false;

      })

      if (clearAll) {
        if (state.data.sections[sectionIndex].sub_sections.length > 0) {
          state.data.sections[sectionIndex].sub_sections.forEach((subSec) => {
            subSec.isDirty = false;
            subSec.hasError = false;
            subSec.items.forEach((eachItem) => {
              // console.log('each item', eachItem)
              eachItem.isDirty = false;
              eachItem.hasError = false;
            })
          })
        }
      }

    },

    addHasError: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, fieldItemIndex, forSwitchFailCase } = action.payload;
      if (forSwitchFailCase) {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[1].hasError = true;
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[1].required = 1
        return;
      }
      state.data.sections[sectionIndex].hasError = true;
      if (fieldItemIndex !== undefined && subSectionIndex === undefined) {
        //specifically for item type group checked by
        state.data.sections[sectionIndex].items[itemIndex].config.fields[fieldItemIndex].hasError = true;
        // state.data.sections[sectionIndex].items[itemIndex].answer[fieldItemIndex].hasError = true;
      }
      if (subSectionIndex !== undefined && itemIndex !== undefined) {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].hasError = true;
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].hasError = true;
        if (fieldItemIndex !== undefined) {
          // console.log('here in redux')
          state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[fieldItemIndex].hasError = true;
        }
        return;
      }

      state.data.sections[sectionIndex].items[itemIndex].hasError = true;
    },

    removeHasError: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex, forSwitchFailCase } = action.payload;
      if (forSwitchFailCase) {
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[1].hasError = false;
        state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[1].required = 0
        return;
      }
      state.data.sections.forEach((section, sectionIndex) => {
        section.items.forEach((item, itemIndex) => {
          // console.log('each item', item)
          //  item.
          item.hasError = false;
        })

        section.sub_sections.forEach((subSection, subSectionIndex) => {
          subSection.items.forEach((item, itemIndex) => {
            item.hasError = false;
          })
        })
      })
    },

    addRequired: (state, action) => {
      const { sectionIndex, subSectionIndex, itemIndex } = action.payload;
      state.data.sections[sectionIndex].sub_sections[subSectionIndex].items[itemIndex].config.fields[1].required = 1
    }
  },
  extraReducers: {
    [fetchCheckListById.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchCheckListById.fulfilled]: (state, action) => {
      let sections = action.payload.sections;
      action.payload.response_answers.forEach((rSection, rSectionIndex) => {

        if (rSection?.sub_sections?.length > 0) {
          rSection.sub_sections.forEach((rSubSection, rSubSectionIndex) => {

            rSubSection.items.forEach((rItem, rItemIndex) => {
              let sectionItem = sections[rSectionIndex].sub_sections[rSubSectionIndex].items[rItemIndex];
              if (sectionItem.config && sectionItem.config.fields.length > 0) {
                _.merge(sectionItem.config.fields, rItem?.response_item_answer?.additional_answer);
                sectionItem.answer = rItem?.response_item_answer?.answer;
              } else {
                sectionItem.answer = rItem?.response_item_answer?.answer;
              }

              if (sectionItem.type === 'switch') {
                if (rItem?.response_item_answer === null) {
                  sectionItem.answer = 'n/a'
                }
              }
            })

          })
        }

        if (rSection?.items?.length > 0) {
          rSection.items.forEach((rItem, rItemIndex) => {
            let onlySectionItem = sections[rSectionIndex]?.items[rItemIndex];
            if (onlySectionItem.answer === undefined) {
              onlySectionItem.answer = {}
            }
            onlySectionItem.answer = rItem?.response_item_answer?.answer;
            if (onlySectionItem.type === 'group') {
              if (!onlySectionItem.answer) {
                onlySectionItem.answer = [onlySectionItem?.config?.fields]
              }
            }
          })
        }

      })
      state.status = 'succeeded';

      state.data = action.payload;
      // state.initialData = state.data
    },
    [fetchCheckListById.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectChecklist = (state) => state.checklist.data;
export const selectAllCheckLists = (state) => state.checklist.allData;
export const initialChecklistData = (state) => state.checklist.initialData;

export const {
  updateChecklist,
  fetch: getAllChecklistSuccess,
  updateItemAnswer,
  updateAdditionalAnswer,
  updateSubSectionItemAnswer,
  updateGroupItemAnswer,
  updateSubSectionGroupItemAnswer,
  removeGroupItemAnswer,
  removeSubSectionGroupItemAnswer,
  removeDirtyCheck,
  addDirtyCheck,
  addHasError,
  removeHasError,
  addNewGroupItem,
  addRequired
} = checkListSlice.actions;

export default checkListSlice.reducer;
