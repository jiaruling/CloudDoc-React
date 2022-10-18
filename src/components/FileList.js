import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from "../hooks/usekeyPress";

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const node = useRef(null)
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = () => {
        setEditStatus(false)
        setValue('')
    }

    useEffect(() => {
        if (enterPressed && editStatus) {
            const editItem = files.find(file => file.id === editStatus)
            onSaveEdit(editItem.id, value)
            setEditStatus(false)
            setValue('')
        }
        if (escPressed && editStatus) {
            closeSearch()
        }
    })

    useEffect(() => {
        if (editStatus) {
            node.current.focus()
        }
    }, [editStatus])

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
                        key={file.id}
                    >
                        {(file.id !== editStatus) &&
                            <>
                                <span className="col-2">
                                    <FontAwesomeIcon
                                        size="lg"
                                        icon={faMarkdown}
                                    />
                                </span>
                                <span
                                    className="col-6 c-link"
                                    onClick={() => { onFileClick(file.id) }}
                                >
                                    {file.title}
                                </span>
                                <span className="col-2">
                                    <button
                                        type="button"
                                        className="icon-button"
                                        onClick={() => { setEditStatus(file.id); setValue(file.title) }}
                                    >
                                        <FontAwesomeIcon
                                            title="编辑"
                                            size="md"
                                            icon={faEdit}
                                        />
                                    </button>
                                </span>
                                <span className="col-2">
                                    <button
                                        type="button"
                                        className="icon-button"
                                        onClick={() => { onFileDelete(file.id) }}
                                    >
                                        <FontAwesomeIcon
                                            title="删除"
                                            size="md"
                                            icon={faTrash}
                                        />
                                    </button>
                                </span>
                            </>
                        }
                        {(file.id === editStatus) &&
                            <>
                                <span className="col-10">
                                    <input
                                        className="form-control col-10"
                                        value={value}
                                        ref={node}
                                        onChange={(e) => { setValue(e.target.value) }}
                                    />
                                </span>
                                <span className="col-2">
                                    <button
                                        type="button"
                                        className="icon-button col-2"
                                        onClick={closeSearch}
                                    >
                                        <FontAwesomeIcon
                                            title="关闭"
                                            size="lg"
                                            icon={faTimes}
                                        />
                                    </button>
                                </span>

                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

// 参数类型检查
FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}

export default FileList;