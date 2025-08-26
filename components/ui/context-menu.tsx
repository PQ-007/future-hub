import { MoreVertical } from 'lucide-react';
import { Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';

interface ContextMenuProps {
  items: MenuProps['items'];
  children: React.ReactNode;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, children }) => {
  return (
    <Dropdown 
      overlay={<Menu items={items} />} 
      trigger={['click']}
      placement="bottomRight"
    >
      <button 
        onClick={e => e.stopPropagation()} 
        className="p-1 rounded hover:bg-sidebar-accent/70 transition-colors"
      >
        <MoreVertical className="h-3 w-3" />
      </button>
    </Dropdown>
  );
};