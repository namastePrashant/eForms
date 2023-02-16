import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set, selectSidebarShow } from '../store/reducer/sidebar';
import {
  fetchCheckListById,
  selectChecklist,
} from '../store/reducer/checklist';
import {
  CSidebar,
  CSidebarNav,
  CSidebarHeader,
} from '@coreui/react';
import { Menu, Tooltip, Button } from 'antd';

import {
  SyncOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone,
  PlusOutlined, LeftOutlined, RightOutlined, MinusOutlined, SaveOutlined
} from '@ant-design/icons';
import config from '../config';
import { removeHasError } from '../store/reducer/checklist';

const { SubMenu } = Menu;

const TheSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector(selectSidebarShow);
  const checklist = useSelector(selectChecklist);
  const [navigation, setNavigation] = useState([]);
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  // const [isComplete, setIsComplete] = useState(false)
  // useEffect(() => {
  //   // console.log('changes in checklist')
  // }, [checklist])


  useEffect(() => {
    if (props?.sections) {
      setNavigation(
        checklist?.sections?.map((section) => {
          const url = section.name.toLowerCase().replace(/[^A-Z0-9]+/gi, '-');
          return {
            _tag: 'CSidebarNavItem',
            name: section.name,
            to: `/${url}`,
            isDirty: section.isDirty,
            hasError: section.hasError,
            hasSubMenu: section.has_skus,
            subMenus: section.sub_sections,
            items: section?.items
            // hasSubMenu: true
          };
        })
      );
    }
    // console.log('changes in section')
  }, [props?.sections]);

  const handleClick = (e) => {
    props.handleSectionChange(e);
    // dispatch(set(false));
  };

  useEffect(() => {

  }, [])

  const handleSaveClicked = (e, sectionIndex, subSectionIndex) => {
    e.stopPropagation();
    // console.log('submit all pressed', props.sections[sectionIndex])
    // console.log('submit for this section', sectionIndex, subSectionIndex, props.sections[sectionIndex])
    props.handleSubmission(sectionIndex, subSectionIndex, subSectionIndex !== undefined ? false : true);
  }

  const handleSubmit = () => {
    props.handleSubmissionFromHeader();
    dispatch(removeHasError());

  }

  const checkConfigFieldsCompleteness = (configFields) => {
    let isComplete = false;
    configFields.forEach(fieldItem => {
      if (fieldItem.required) {
        if (fieldItem.answer) {
          isComplete = true;
        } else {
          isComplete = false
        }
      }
    })
    return isComplete
  }

  const checkItemsCompleteness = useCallback((items) => {
    let isComplete = true;
    items.forEach(item => {
      // console.log('each item', item)
      if (Array.isArray(item.answer)) {
        item.answer.forEach((itemAnswers) => {
          if (Array.isArray(itemAnswers)) {
            itemAnswers.forEach(itemAns => {
              if (itemAns.required && itemAns.answer === undefined) {
                isComplete = false
              }
            })
          }
        })
      }
      else {
        if (!item.answer) {
          // console.log('no answer', item)
          isComplete = false;
          if (item?.config && Array.isArray(item?.config?.fields)) {
            isComplete = checkConfigFieldsCompleteness(item.config.fields)
            // console.log('isComplete check in if', isComplete)
          }
        } else {
          if (item?.config && Array.isArray(item?.config?.fields)) {
            isComplete = checkConfigFieldsCompleteness(item.config.fields)
          }
        }
      }
    })
    return isComplete
  }, [props.sections])

  // console.log('navigation', navigation)
  return (
    <>
      <CSidebar
        show={show}
        size={'xl'}
        colorScheme={'light'}
        onShowChange={(val) => dispatch(set(val))}
        className='sidebar'
      >
        <CSidebarHeader className='d-md-down-none' to='/'>
          <h5 className='d-flex'>{checklist?.name}</h5>
        </CSidebarHeader>

        <CSidebarNav>
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={['0']}
            mode="inline"
            onOpenChange={(openKeys) => setSubMenuOpen(!subMenuOpen)}
          >
            <Menu.Item key={9999}>Overview</Menu.Item>

            {navigation?.map((section, index) => {
              let isComplete = true
              isComplete = checkItemsCompleteness(checklist.sections[index].items);

              if (checklist.sections[index].sub_sections.length > 0) {
                checklist.sections[index].sub_sections.forEach((subSection, subSectionIndex) => {
                  isComplete = checkItemsCompleteness(subSection?.items);
                  {/* console.log('subsection completeness check', index, subSectionIndex, isComplete) */ }
                })
              }
              const errorIcon = <Tooltip title="Error has occured in this section."><ExclamationCircleTwoTone twoToneColor='red' className="error-icon" /></Tooltip>;
              const completeIcon = <CheckCircleTwoTone twoToneColor="#52c41a" className="complete-icon" />

              const DirtyFlagIcon = ({ isSubMenu, subMenuIndex }) => {
                return (
                  <Tooltip title="Changes has been made which is yet to be submitted.">
                    <SyncOutlined style={{ fontSize: 14, color: '#0071BC' }} onClick={(e) => {
                      handleSaveClicked(e, index, subMenuIndex);
                    }}
                      className="save-icon"
                    />
                  </Tooltip>)
              };

              let hasErrorInSubSection = false;
              section.subMenus.forEach(subMenu => {
                Array.isArray(subMenu.items) && subMenu.items.forEach(subMenuItem => {
                  if (subMenuItem.hasError) {
                    hasErrorInSubSection = true;
                    return;
                  }
                  {/* if(subMenuItem.config){
                    subMenuItem.config.fields.forEach(subMenuItemField=>{
                      if(subMenuItemField.required){
                        if(sub)
                      }
                    })
                  } */}
                })
              })

              if (section.hasSubMenu) {
                let sectionIsDirty = false;
                //for showing dirty flag in section for a submenu
                section.subMenus.forEach((sec) => {
                  if (sec.isDirty) {
                    sectionIsDirty = true
                  }
                })
                return (

                  <SubMenu
                    icon={subMenuOpen ? <MinusOutlined /> : <PlusOutlined />}
                    key="sub4"
                    expandIcon={() => <></>}
                    className=""
                    title={
                      <>
                        {section?.name}
                        <div className="menu-icon-wrapper">
                          {section?.hasError && errorIcon}
                          {sectionIsDirty && <DirtyFlagIcon />}
                        </div>

                      </>
                    }>
                    {section.subMenus.map((subM, subMIndex) => {
                      return (
                        <Menu.Item
                          key={index + '-' + subMIndex}
                        >
                          {subM?.description} - ({subM?.item_number})
                          <div className="menu-icon-wrapper">


                            {isComplete && !section?.isDirty &&
                              completeIcon
                            }
                            {subM?.hasError && errorIcon}
                            {subM?.isDirty && <DirtyFlagIcon isSubMenu={true} style={{ fontSize: 14 }} subMenuIndex={subMIndex} />}
                          </div>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>

                )
              }


              return (
                <Menu.Item key={index}>
                  {section?.name}
                  {isComplete && !section?.isDirty &&
                    completeIcon
                  }
                  {((section?.hasError && !section?.hasSubMenu) || (section?.items?.some(item => item.hasError)) || hasErrorInSubSection) && errorIcon}

                  {section?.isDirty && !section?.hasSubMenu && <DirtyFlagIcon />}
                </Menu.Item>);
            })}

            <Menu.Item key={999}>Final Inspection</Menu.Item>
          </Menu>
        </CSidebarNav>
        <div className="sidebar-footer">
          <Button
            size='medium'
            htmlType='submit'
            block
            type='outline'
            shape='round'
            className="footer-btn"
            onClick={() => handleSubmit()}
          >

            Save All
        </Button>
        </div>
      </CSidebar>
    </>
  );
};

export default TheSidebar;
