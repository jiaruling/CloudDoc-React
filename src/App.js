import React, { useState } from 'react';
import uuid4 from 'uuid'
import * as marked from 'marked'
import SimpleMDE from "react-simplemde-editor";
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import "easymde/dist/easymde.min.css";
import './App.css';

import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';
import BottomBtn from './components/BottomBtn';
import TabList from './components/TabList';

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [searchedFiled, setSearchedFiled] = useState([])
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  })
  const activeFile = files.find(file => file.id === activeFileID)
  const fileClick = (fileID) => {
    // set current active file
    setActiveFileID(fileID)
    // if opendFiles 
    if (!openedFileIDs.includes(fileID)) {
      // add new fikeID to openedFile
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }
  const tabClick = (fileID) => {
    // set current active file
    setActiveFileID(fileID)
  }
  const tabClose = (id) => {
    //remove current id from openedFile
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWithout)
    // set the active to the first opened tab if still tabs left
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0])
    } else {
      setActiveFileID('')
    }
  }
  const fileChange = (id, value) => {
    // loop through file array to update to new value
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.body = value
      }
      return file
    })
    setFiles(newFiles)
    // update unsavedIDs
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const deleteFile = (id) => {
    // filter out the current file id
    const newFiles = files.filter(file => file.id !== id)
    setFiles(newFiles)
    // close the tab if opened
    tabClose(id)
  }

  const updateFileName = (id, title) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.title = title
      }
      return file
    })
    setFiles(newFiles)
  }

  const FiledSearch = (keyword) => {
    const newFiles = files.filter(file => file.title.includes(keyword))
    setSearchedFiled(newFiles)
  }

  const fileListArr = (searchedFiled.length > 0) ? searchedFiled : files

  // todo 创建文件

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        {/* 左侧栏 */}
        <div className="col-3 text-bg-light left-panel">
          <FileSearch
            title="My Document"
            onFileSearch={FiledSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <BottomBtn
              text="新建"
              colorClass="btn-primary col-6"
              icon={faPlus}
              onBtnClick={()=>{}}
            />
            <BottomBtn
              text="导入"
              colorClass="btn-success col-6"
              icon={faFileImport}
            />
          </div>
        </div>
        {/* 右侧栏 */}
        <div className="col-9 right-panel">
          {!activeFile &&
            <div className='start-page'>
              选择或者创建新的 Markdown 文档
            </div>
          }
          {activeFile &&
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE
                value={activeFile.body}
                onChange={(value) => { fileChange(activeFile.id, value) }}
                options={{
                  autofocus: true,
                  spellChecker: false,
                  previewRender: (plainText, preview) => { // Async method
                    setTimeout(() => {
                      preview.innerHTML = marked.parse(plainText);
                    }, 250);
                    return "Loading...";
                  },
                  minHeight: "400px"
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
