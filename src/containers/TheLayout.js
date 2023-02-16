import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TheContent, TheSidebar, TheHeader } from './index';
import {
  fetchCheckListById,
  selectChecklist,
} from '../store/reducer/checklist';
import FinalInspection from '../views/pages/finalInspection/finalInspection';
import { Spin } from 'antd';
import AuthModal from '../reusable/authModal';
import { selectAuthStatus } from '../store/reducer/auth';
import { data, authCred } from '../store/reducer/auth';
import { updateSectionApi } from '../services/section';
import _ from 'lodash';
import { removeDirtyCheck } from '../store/reducer/checklist';
import Overview from '../views/pages/overview/Overview';
import { useParams } from 'react-router';


const TheLayout = (props) => {
  const dispatch = useDispatch();
  const checklist = useSelector(selectChecklist);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState();
  const checklistStatus = useSelector((state) => state.checklist.status);
  const [fetch, setFetch] = useState(false)
  const userData = useSelector(data);
  const authCredential = useSelector(authCred);
  const [showAuthModal, setAuthModal] = useState(false);
  const isAuthenticated = useSelector(selectAuthStatus);
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const [tempSectionIndex, setTempSectionIndex] = useState()
  const [tempSubSectionIndex, setTempSubSectionIndex] = useState();
  const [tempIsSectionSubmission, setIsSectionSubmission] = useState(false)
  const [checkAuthForHeader, setCheckAuthForHeader] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setUserAuthenticated(isAuthenticated)
  }, [isAuthenticated]);

  useEffect(() => {
    if (checklistStatus === 'succeeded') {
      setFetch(false)
    } else {
      setFetch(true)
    }
  }, [checklistStatus])

  useEffect(() => {
    let decResponseId = id;
    let responseId = atob(decResponseId);
    if (responseId) {
      localStorage.setItem('responseId', responseId)
    }
    // if (!responseId) {
    //   responseId = localStorage.getItem('responseId');
    // }
    // let responseId = props.history.location.responseId;
    if (!responseId) {
      props.history.push({
        pathname: '/responses'
      })
      return;
    }

    dispatch(fetchCheckListById(responseId));
  }, []);

  useEffect(() => {
    if (checklist?.sections) {
      setSections(checklist?.sections);
    }
  }, [checklist]);

  const handleSectionChange = (obj) => {
    // console.log('handle section change', obj)
    let sectionKey = obj.key.split('-')[0];
    let subMenuKey = obj.key.split('-')[1];
    setActiveSection(sectionKey);
    setActiveSubMenu(subMenuKey);
  };


  const checkAuthentication = (userHasBeenAuthenticated) => {
    if (userAuthenticated || userHasBeenAuthenticated) {
      return true
    }
    // console.log('user has not been authenticated')
    setAuthModal(!showAuthModal);
    return false
  };


  const handleSubmission = (sectionIndex, subSectionIndex, isSectionSubmission) => {
    // console.log('handle submission called', sectionIndex, subSectionIndex, isSectionSubmission)
    setTempSectionIndex(sectionIndex);
    setTempSubSectionIndex(subSectionIndex);
    setIsSectionSubmission(isSectionSubmission ?? false);

    // if (!validation(sectionIndex, subSectionIndex, isSectionSubmission)) {
    //   notification.error({
    //     message: 'Fields with * must be answered',
    //   });  
    //   return;
    // }
    handleSubmit(null, null, sectionIndex, subSectionIndex, isSectionSubmission)
  }

  const handleSubmissionFromHeader = (authenticationSuccessResponse, authCred) => {
    if (!checkAuthentication(authenticationSuccessResponse ? true : false)) {
      setCheckAuthForHeader(true)
      return;
    }
    let finalAnswer = [];
    checklist.sections.forEach((section, sectionIndex) => {
      let answer = getAnswers(sectionIndex, null, true, true);
      if (answer.length > 0) {
        finalAnswer.push(answer)
      }
    })
    let answers = _.flatten(finalAnswer);

    let authHeader = {
      userid: userData?.id,
      pin: authCredential?.pin,
    };
    if (authenticationSuccessResponse) {
      //this is for locked case
      authHeader = {
        userid: authenticationSuccessResponse?.data?.id,
        pin: authCred?.pin,
      };
    }

    let dataForSubmission = {
      response_id: localStorage.getItem('responseId'),
      answers,
    };
    console.log('data for submission', dataForSubmission)

    setFetch(true)
    updateSectionApi(
      dataForSubmission,
      authHeader,
      () => {
        checklist.sections.forEach((section, sectionIndex) => {
          dispatch(removeDirtyCheck({ sectionIndex: sectionIndex, clearAll: true }));
        })
      },
      () => setFetch(false));
  }


  const handleSubmit = (authenticationSuccessResponse, authCred, sectionIndex, subSectionIndex, isSectionSubmission) => {

    let secIndex = sectionIndex;
    if (secIndex === undefined) {
      secIndex = tempSectionIndex
    }
    let subSecIndex = subSectionIndex;
    if (subSecIndex === undefined) {
      subSecIndex = tempSubSectionIndex;
    }

    let isSecSubmission = isSectionSubmission;
    if (isSecSubmission === undefined) {
      isSecSubmission = tempIsSectionSubmission
    }

    if (!checkAuthentication(authenticationSuccessResponse ? true : false)) {
      return;
    }
    let answers = getAnswers(secIndex, subSecIndex, isSecSubmission);

    // callSubmitApi();

    //authentication header part
    //this is for unlocked case
    let authHeader = {
      userid: userData?.id,
      pin: authCredential?.pin,
    };
    if (authenticationSuccessResponse) {
      //this is for locked case
      authHeader = {
        userid: authenticationSuccessResponse?.data?.id,
        pin: authCred?.pin,
      };
    }
    //

    let dataForSubmission = {
      response_id: localStorage.getItem('responseId'),
      answers,
    };
    // console.log('data for submission here', dataForSubmission);
    // console.log('----------------')
    setFetch(true)
    updateSectionApi(
      dataForSubmission,
      authHeader,
      () => {
        dispatch(removeDirtyCheck({ sectionIndex: secIndex, subSectionIndex: subSecIndex, onlySubSection: !isSecSubmission }));
        setTempSectionIndex()
      },
      () => setFetch(false));
  };



  const getAnswers = (sectionIndex, subSectionIndex, isSectionSubmission, isSubmitAll) => {
    if (isSectionSubmission) {
      let currentSection = sections[sectionIndex];
      let tempAns = []
      if (currentSection.items.length > 0) {
        currentSection.items.forEach((item, itemIndex) => {
          // if (item.isDirty) {
          if (item.answer) {
            tempAns.push({ item_id: item.id, answer: item.answer })
          }
          // }
        })
      }

      if (currentSection.sub_sections.length > 0) {
        currentSection.sub_sections.forEach((subSection, subSectionIndex) => {
          // console.log('subsection here', subSection)
          subSection.items.forEach((subSectionItem, subSectionItemIndex) => {
            if (subSectionItem.isDirty) {
              // console.log('from down here', subSection);
              tempAns.push({ item_id: subSectionItem.id, answer: subSectionItem.answer, additional_answer: subSectionItem?.config?.fields, sku_id: subSection?.is_sku ? subSection?.item_number : '' });
              return;
            }
          })
        })
      }
      // if (isSubmitAll) {
      //   let itemAnswers = getAnswersFromSectionItems(sectionIndex);
      //   console.log('only items answer', itemAnswers);
      //   if (itemAnswers.length > 0) {
      //     tempAns = [...tempAns, ...itemAnswers]
      //     tempAns = tempAns.flat()
      //   }
      // }
      return tempAns;
    }
    if (subSectionIndex !== undefined) {
      return getAnswersFromSubSectionItems(sectionIndex, subSectionIndex)
    }
    return getAnswersFromSectionItems(sectionIndex);
  }


  const getAnswersFromSectionItems = (sectionIndex) => {
    // console.log('getAnswersFromSectionItems called', sectionIndex)
    let ans = getAnswersFromItems(sections[sectionIndex])
    // console.log('ans here', ans)
    return ans;
  }

  const getAnswersFromSubSectionItems = (sectionIndex, subSectionIndex) => {
    // console.log('getAnswersFromSubSectionItems', sectionIndex, subSectionIndex)
    let ans = getAnswersFromItems(sections[sectionIndex].sub_sections[subSectionIndex]);
    return ans;
  }

  const getAnswersFromItems = (ancestor) => {
    // console.log('getAnswersFromItems called', ancestor)
    let ans = [];

    ancestor && ancestor.items.forEach(item => {
      // console.log('each item here', item)
      if (item.answer || item.answer === '') {
        // console.log('inside each item answer', item)
        if (item.config) {
          ans.push({ item_id: item.id, answer: item.answer, additional_answer: item?.config?.fields, sku_id: ancestor.is_sku ? ancestor.item_number : '' })
          return;
        }
        ans.push({ item_id: item.id, answer: item.answer, sku_id: ancestor.is_sku ? ancestor.item_number : '' })
      }
    })
    return ans;

  }

  if (sections.length > 1) {

    return (
      <Spin spinning={fetch}>
        <div className='c-app c-default-layout'>

          <TheSidebar
            sections={sections}
            handleSectionChange={handleSectionChange}
            activeSection={activeSection}
            parentProps={props}
            handleSubmission={handleSubmission}
            history={props.history}
            handleSubmissionFromHeader={handleSubmissionFromHeader}
          />

          <div className='c-wrapper'>
            <TheHeader
              section={sections[activeSection]}
              checklistTitle={checklist?.name}
              activeSection={activeSection}
              handleSubmission={handleSubmission}
              // handleSubmissionFromHeader={handleSubmissionFromHeader}
              history={props.history}
            />
            <div className='c-body'>
              {activeSection == 999 && (
                <div>
                  <div className='form-title'>
                    <h4>Final Inspection</h4>
                  </div>
                  <FinalInspection />
                </div>
              )}
              {activeSection == 9999 && (
                <div>
                  <div className='form-title'>
                    <h4>Overview</h4>
                  </div>
                  <Overview isUpdate={true} />
                </div>
              )}
              <TheContent
                section={sections[activeSection]}
                sectionIndex={activeSection}
                activeSubMenu={activeSubMenu}
                handleSubmission={handleSubmission}

              />
            </div>
          </div>
          <AuthModal
            visible={showAuthModal}
            onCancel={() => setAuthModal(false)}
            onSuccess={(response, authCred) => {
              checkAuthForHeader ? handleSubmissionFromHeader(response, authCred) :
                handleSubmit(response, authCred);
              setAuthModal(false);
            }}
            fromHeader={false}
            disableToast={true}
          />
        </div>
      </Spin>
    );
  }
  return (
    <div className="initial-spin-container">
      <Spin spinning={true} size="large" />
    </div>);

};

export default TheLayout;
