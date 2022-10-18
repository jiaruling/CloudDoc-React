import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';
import BottomBtn from './components/BottomBtn';
import TabList from './components/TabList';
import * as marked from 'marked'

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id == openID)
  })
  const activeFile = files.find(file => file.id === activeFileID)
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        {/* 左侧栏 */}
        <div className="col-3 text-bg-light left-panel">
          <FileSearch
            title="My Document"
            onFileSearch={(value) => { console.log(value) }}
          />
          <FileList
            files={files}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(id) => { console.log("delete" + id) }}
            onSaveEdit={(id, value) => { console.log(id); console.log(value) }}
          />
          <div className="row no-gutters button-group">
            <BottomBtn
              text="新建"
              colorClass="btn-primary col-6"
              icon={faPlus}
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
          { !activeFile &&
            <div className='start-page'>
              选择或者创建新的 Markdown 文档
            </div>
          }
          { activeFile &&
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={(id) => { console.log(id) }}
                onCloseTab={(id) => { console.log("closing" + id) }}
              />
              <SimpleMDE
                value={activeFile.body}
                onChange={(value) => { console.log(value) }}
                options={{
                  previewRender: (plainText, preview) => { // Async method
                    setTimeout(() => {
                      preview.innerHTML = marked.parse(plainText);
                    }, 250);

                    return "Loading...";
                  },
                  minHeight: "415px"
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
