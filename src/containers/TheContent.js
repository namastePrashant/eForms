import React, { useRef } from 'react';
import { CContainer } from '@coreui/react';
import SubSectionComponent from '../views/subSection';
import ItemComponent from '../views/items';
import { Button } from 'antd';

const TheContent = (props) => {
  const childRef = useRef();


  const handleSubmit = (sectionIndex, subSectionIndex) => {
    // console.log('handleSubmit called', sectionIndex, subSectionIndex);
    props.handleSubmission(sectionIndex, props.activeSubMenu !== undefined ? props.activeSubMenu : subSectionIndex)
  };


  // useEffect(() => {
  //   return () => {
  //     console.log('unmounted')
  //   }
  // }, [])

  // console.log('sections here', props.section);
  // console.log('active submenu at content', props.activeSubMenu)

  return (
    <main className={`c-main section-${props.sectionIndex}`} >
      <CContainer fluid>

        <div className="actual-content">
          {props?.section?.items.length > 0 && (
            <div className='only-items-container'>
              <div className='form-title'>
                <h4>{props?.section?.name}</h4>
              </div>
              {props.section.items.map((item, index) => {
                //for section>items 
                return (
                  <div className='only-items' key={index.toString()}>
                    <ItemComponent
                      item={item}
                      itemIndex={index}
                      sectionIndex={props.sectionIndex}
                      ref={childRef}
                      onlyItems
                      isSectionItem={true}
                    />
                  </div>
                );
              })}
              <div className='d-flex mb-5 justify-content-center mt-4'>
                <Button
                  size='large'
                  htmlType='submit'
                  type='primary'
                  block
                  className='save-btn'
                  onClick={() => handleSubmit(props.sectionIndex)}
                >

                  Save data
            </Button>
              </div>

            </div>
          )}
          {props?.section?.sub_sections.length > 0 && (
            //for section>subsections
            <SubSectionComponent
              subSections={props?.section?.has_skus ? [props?.section?.sub_sections[props.activeSubMenu]] : props?.section?.sub_sections}
              ref={childRef}
              sectionIndex={props.sectionIndex}
              handleSubmit={(subSectionIndex) => handleSubmit(props.sectionIndex, subSectionIndex)}
              activeSubMenu={props.activeSubMenu}
              section={props?.section}
            />
          )}
        </div>
      </CContainer>
    </main >
  );
};

export default React.memo(TheContent);
