import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import md5 from 'md5';

import logoImg from '../../assets/logo-v2.png';

import {
  HeaderContainer,
  HeaderContent,
  Profile,
  LogOutButton,
  Logo,
} from './styles';
import { useAuth } from '../../hooks/Auth';
import LanguageSelector from '../LanguageSelector';

function Header(): JSX.Element {
  const { user, singOut } = useAuth();
  const { t } = useTranslation(['translations']);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <Logo src={logoImg} alt="logo clinitech" />
        </Link>

        <Profile>
          <img
            src={`https://s.gravatar.com/avatar/${md5(
              user.email.toLowerCase().trim(),
              {
                encoding: 'binary',
              },
            )}
            ?s=200&d=https%3A%2F%2Fui-avatars.com%2Fapi%2F${user.name.replace(
              ' ',
              '%2B',
            )}/200`}
            alt={user && user.name}
          />

          <div>
            <span>{t('header.welcome')},</span>
            <strong>{user && user.name}</strong>
          </div>
        </Profile>
        <LanguageSelector />
        <LogOutButton
          onClick={() => {
            singOut();
            navigate('/');
          }}
        >
          <RiLogoutCircleRLine size={40} />
        </LogOutButton>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
