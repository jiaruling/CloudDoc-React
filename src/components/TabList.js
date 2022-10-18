import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import classNames from "classnames";
import './TabList.scss';

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
    return (
        <ul className="nav nav-pills tablist-component">
            {
                files.map(file => {
                    const withUnsavedMark = unsaveIds.includes(file.id)
                    const fClassName = classNames({
                        "nav-link": true,
                        'active': file.id === activeId,
                        'withUnsaved': withUnsavedMark
                    })
                    return (
                        <li className="nav-item" key={file.id}>
                            <a
                                className={fClassName}
                                href="#"
                                onClick={(e)=>{e.preventDefault(); onTabClick(file.id)}}
                            >
                                {file.title}
                                <span className="ms-2 close-icon">
                                    <FontAwesomeIcon
                                        size="md"
                                        icon={faTimes}
                                        onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}
                                    />
                                </span>
                                { withUnsavedMark && <span className="rounded-circle ms-2 unsaved-icon"></span>}
                            </a>
                        </li>
                    )
                })}
        </ul>
    )
}

// 参数类型检查
TabList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unsaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func
}

// 参数默认值
TabList.defaultProps = {
    unsaveIds: []
}
export default TabList;