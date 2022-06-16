import React from 'react' 
import Login_ICO from '../../../img/icons/login_ico.svg'
import Register_ICO from '../../../img/icons/register_ico.svg'
import Profile_ICO from '../../../img/icons/profile_ico.svg'
import Settings_ICO from '../../../img/icons/settings_ico.svg'
import Logout_ICO from '../../../img/icons/logout_ico.svg'

const UserActiveMenuButton = (props) => {

    const Icons = new Map([
        ['login', Login_ICO],
        ['register', Register_ICO],
        ['profile', Profile_ICO],
        ['settings', Settings_ICO],
        ['logout', Logout_ICO]
    ])

    return (
        <div className="user-active_menu__panel__btn-container"> 
            <a href={props.link} className="user-active_menu-btn">
                <img src={Icons.get(props.name)} alt={props.alt} />
                <span className="user-active_menu-btn-text">{props.text}</span>
            </a>
        </div>
    )
}

export default UserActiveMenuButton