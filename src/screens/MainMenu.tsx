import React from "react";
import { BaseScaffold } from "../components/ui/BaseScaffold";
import { MainHeader } from "../components/layout/MainHeader";
import { MenuButton } from "../components/ui/MenuButton";
import { MenuItem, NavigationProps } from "../types";
import { ProfileScreen } from "../screens/ProfileScreen";

// Создаем простые компоненты для других экранов
const ScheduleScreen: React.FC<NavigationProps> = ({ onNavigate }) => (
  <div>
    <h1>Расписание вывоза</h1>
    <button onClick={() => onNavigate('main')}>Назад</button>
  </div>
);

const LocationsScreen: React.FC<NavigationProps> = ({ onNavigate }) => (
  <div>
    <h1>Пункты приема</h1>
    <button onClick={() => onNavigate('main')}>Назад</button>
  </div>
);

const RequestsScreen: React.FC<NavigationProps> = ({ onNavigate }) => (
  <div>
    <h1>Мои заявки</h1>
    <button onClick={() => onNavigate('main')}>Назад</button>
  </div>
);

const WorkScreen: React.FC<NavigationProps> = ({ onNavigate }) => (
  <div>
    <h1>Работать</h1>
    <button onClick={() => onNavigate('main')}>Назад</button>
  </div>
);

const AboutScreen: React.FC<NavigationProps> = ({ onNavigate }) => (
  <div>
    <h1>О приложении</h1>
    <button onClick={() => onNavigate('main')}>Назад</button>
  </div>
);

export const MainMenu: React.FC<NavigationProps> = ({ onNavigate }) => {
  const menuItems: MenuItem[] = [
    {
      id: "profile",
      icon: "👤",
      title: "Профиль",
      subtitle: "Управление профилем",
      component: ProfileScreen,
    },
    {
      id: "schedule",
      icon: "📅",
      title: "Расписание вывоза",
      subtitle: "График вывоза мусора",
      component: ScheduleScreen,
    },
    {
      id: "locations",
      icon: "📍",
      title: "Пункты приема",
      subtitle: "Карта пунктов приема",
      component: LocationsScreen,
    },
    {
      id: "requests",
      icon: "📋",
      title: "Мои заявки",
      subtitle: "История заявок",
      component: RequestsScreen,
    },
    {
      id: "work",
      icon: "💼",
      title: "Работать",
      subtitle: "Начать работу",
      component: WorkScreen,
    },
    {
      id: "about",
      icon: "ℹ️",
      title: "О приложении",
      subtitle: "Информация о сервисе",
      component: AboutScreen,
    },
  ];

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.component) {
      onNavigate(item.component);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <BaseScaffold
      header={<MainHeader title="Вынос мусора" subtitle="Экологичный сервис" />}
    >
      <div style={{ padding: "24px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column" as const,
          gap: "16px",
          marginBottom: "32px",
        }}>
          {menuItems.map((item) => (
            <MenuButton
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onClick={() => handleMenuItemClick(item)}
            />
          ))}
        </div>
      </div>
    </BaseScaffold>
  );
};