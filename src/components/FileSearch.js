import React, { useState, useEffect, useRef } from "react"
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from "../hooks/usekeyPress"

const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    const node = useRef(null)
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = () => {
        setInputActive(false)
        setValue('')
    }

    useEffect(() => {
        if (enterPressed && inputActive) {
            onFileSearch(value)
        }
        if (escPressed && inputActive) {
            closeSearch()
        }
    })

    useEffect(() => {
        if (inputActive) {
            node.current.focus()
        }
    }, [inputActive])

    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center mx-0">
            {!inputActive &&
                <>
                    <span>{title}</span>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={() => { setInputActive(true) }}
                    >
                        <FontAwesomeIcon
                            title="搜索"
                            size="lg"
                            icon={faSearch}
                        />
                    </button>
                </>
            }
            {inputActive &&
                <>
                    <input
                        className="form-control"
                        value={value}
                        ref={node}
                        onChange={(e) => { setValue(e.target.value) }}
                    />
                    <button
                        type="button"
                        className="icon-button"
                        onClick={closeSearch}
                    >
                        <FontAwesomeIcon
                            title="关闭"
                            size="lg"
                            icon={faTimes}
                        />
                    </button>
                </>
            }
        </div>
    )
}

// 参数类型检查
FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
}

// 参数默认值
FileSearch.defaultProps = {
    title: "我的云文档"
}

export default FileSearch;