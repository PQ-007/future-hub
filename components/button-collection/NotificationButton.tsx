"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  BellDot, 
  Check, 
  CheckCheck, 
  Settings,
  Trash2,
  UserPlus,
  MessageSquare,
  Calendar,
  AlertCircle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'message' | 'friend_request' | 'reminder' | 'alert' | 'info';
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const NotificationButton = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New message from John',
      description: 'Hey! Can you review the latest component updates?',
      time: '2m ago',
      read: false
    },
    {
      id: '2',
      type: 'friend_request',
      title: 'Friend request',
      description: 'Sarah Johnson wants to connect with you',
      time: '1h ago',
      read: false
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Meeting reminder',
      description: 'Team standup in 15 minutes',
      time: '15m ago',
      read: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'System alert',
      description: 'Server maintenance scheduled for tonight',
      time: '3h ago',
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'friend_request': return UserPlus;
      case 'reminder': return Calendar;
      case 'alert': return AlertCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'message': return 'text-blue-500';
      case 'friend_request': return 'text-green-500';
      case 'reminder': return 'text-orange-500';
      case 'alert': return 'text-red-500';
      case 'info': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn("size-7 hover:bg-accent hover:text-accent-foreground transition-colors relative")}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        >
          {unreadCount > 0 ? (
            <>
              <BellDot className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            </>
          ) : (
            <Bell className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-96" 
        side="bottom" 
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="text-sm font-semibold">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-6 text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <DropdownMenuGroup className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type);
              
              return (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "cursor-pointer p-3 flex items-start gap-3 hover:bg-accent/50",
                    !notification.read && "bg-accent/20"
                  )}
                  onSelect={(e) => e.preventDefault()}
                >
                  <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", iconColor)} />
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate pr-2">
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 pt-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 px-2 text-xs"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Notification Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;