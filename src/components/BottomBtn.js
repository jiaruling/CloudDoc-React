import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => (
    <button
        type="button"
        className={`btn btn-block no-border ${colorClass}`}
        onClick={onBtnClick}
    >
        <FontAwesomeIcon
            className="me-2"
            size="md"
            icon={icon}
        />
        {text}
    </button>
)

// 参数类型检查
BottomBtn.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func
}

// 参数默认值
BottomBtn.defaultProps = {
    text: "新建"
}

export default BottomBtn;