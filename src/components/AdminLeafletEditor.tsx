
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminMapEditor from './admin/AdminMapEditor';
import PackageManagement from './admin/PackageManagement';

const AdminLeafletEditor = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 p-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-300">Manage your website content and settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="map">Map Editor</TabsTrigger>
            <TabsTrigger value="packages">Package Management</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <AdminMapEditor />
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <PackageManagement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLeafletEditor;
