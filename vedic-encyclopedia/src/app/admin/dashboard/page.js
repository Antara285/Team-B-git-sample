'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

/* ✅ CATEGORY — ADMIN ONLY */
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/actions/category.admin.actions';

/* ✅ ARTICLE — ADMIN ONLY */
import {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  deleteArticlesByCategory,
} from '@/actions/article.admin.actions';




export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('categories');

  /* ================= DATA ================= */

  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const [confirm, setConfirm] = useState({
  open: false,
  type: null, // 'category' | 'article'
  id: null,
});


  useEffect(() => {
  async function loadData() {
    const cats = await getCategories();
    const arts = await getArticles();

    setCategories(cats || []);
    setArticles(arts || []);
  }

  loadData();
}, []);


  /* ================= CATEGORY ================= */

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    image: '',
  });

  const openAddCategory = () => {
    setCategoryForm({ name: '', description: '', image: '' });
    setEditingCategoryId(null);
    setShowCategoryForm(true);
  };

  const openEditCategory = (cat) => {
    setCategoryForm(cat);
    setEditingCategoryId(cat.id);
    setShowCategoryForm(true);
  };

 const saveCategory = async () => {
  try {
    if (!categoryForm.name) return;

    if (editingCategoryId) {
      await updateCategory(editingCategoryId, categoryForm);
    } else {
      await addCategory(categoryForm);
    }

    const cats = await getCategories();
    setCategories(cats || []);
    setShowCategoryForm(false);

  } catch (err) {
    console.error(err);
    alert('Category save failed');
  }
};



 const deleteCategoryHandler = async (id) => {
  await deleteArticlesByCategory(id);
  await deleteCategory(id);

  const cats = await getCategories();
  setCategories(cats || []);
};


  /* ================= ARTICLE ================= */

  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [articleForm, setArticleForm] = useState({
    title: '',
    category_id: '',
    content: '',
    status: 'draft',
  });

  const openAddArticle = () => {
    setArticleForm({ title: '', category_id: '', content: '', status: 'draft' });
    setEditingArticleId(null);
    setShowArticleForm(true);
  };

  const openEditArticle = (art) => {
    setArticleForm(art);
    setEditingArticleId(art.id);
    setShowArticleForm(true);
  };

  const saveArticle = async () => {
  if (!articleForm.title || !articleForm.category_id) return;

  if (editingArticleId) {
    await updateArticle(editingArticleId, articleForm);
  } else {
    await addArticle(articleForm);
  }

  const arts = await getArticles();
  setArticles(arts || []);
  setShowArticleForm(false);
};


const generateArticleWithAI = async () => {
  if (!articleForm.title) {
    alert("Please enter title first");
    return;
  }

  const res = await fetch("/api/ai/generate-article", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: articleForm.title,
      category: articleForm.category_id,
    }),
  });

  const data = await res.json();

  setArticleForm(prev => ({
    ...prev,
    content: data.content,
  }));
};

  const deleteArticleHandler = async (id) => {
  await deleteArticle(id);

  const arts = await getArticles();
  setArticles(arts || []);
};


  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.replace('/admin/login');
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-50 flex">


      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold text-indigo-700">Admin Panel</h2>

          <p className="text-sm text-gray-500 mb-6">Vedic Encyclopedia</p>

          <div className="space-y-2">
            <SidebarBtn
  text="Dashboard"
  onClick={() => setActiveTab('categories')}
/>

<SidebarBtn
  text="Categories"
  onClick={() => setActiveTab('categories')}
/>

<SidebarBtn
  text="Articles"
  onClick={() => setActiveTab('articles')}
/>

          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-2 text-indigo-800">Dashboard</h1>

          <p className="text-gray-600 mb-8">
            Manage your encyclopedia categories and articles
          </p>

          {/* ✅ STATS RESTORED */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Categories" value={categories.length} />
            <StatCard title="Total Articles" value={articles.length} />
            <StatCard
  title="Published"
  value={articles.filter(a => a.status === 'published').length}
/>

<StatCard
  title="Drafts"
  value={articles.filter(a => a.status === 'draft').length}
/>

          </div>

          {/* TABS */}
          <div className="flex gap-6 border-b mb-6">
            <TabButton
              active={activeTab === 'categories'}
              onClick={() => setActiveTab('categories')}
              text="Categories"
            />
            <TabButton
              active={activeTab === 'articles'}
              onClick={() => setActiveTab('articles')}
              text="Articles"
            />
          </div>

          {/* ================= CATEGORIES ================= */}

          {activeTab === 'categories' && (
            <>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>

                <button
                  onClick={openAddCategory}
                  className="bg-amber-600 hover:bg-amber-700 text-white

 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus size={16} /> Add Category
                </button>
              </div>

              {showCategoryForm && (
                <div className="bg-white p-5 rounded-lg shadow mb-6">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">
                      {editingCategoryId ? 'Edit Category' : 'Add Category'}
                    </h3>
                    <X onClick={() => setShowCategoryForm(false)} />
                  </div>

                  <div className="grid gap-3">
                    <input
                      className="border p-2 rounded"
                      placeholder="Category name"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({ ...categoryForm, name: e.target.value })
                      }
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Description"
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Image URL"
                      value={categoryForm.image}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          image: e.target.value,
                        })
                      }
                    />

                    <button
                      onClick={saveCategory}
                      className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded"

                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6">
                {categories.map((cat) => (
  <div
    key={cat.id}
    className="rounded-xl p-[2px] bg-yellow-400"
  >
    <div className="bg-white rounded-lg shadow overflow-hidden">

                    {cat.image && (
                      <img src={cat.image} className="h-40 w-full object-cover" />
                    )}
                    <div className="p-5">
                      <h3 className="font-medium text-indigo-800">{cat.name}</h3>

                      <p className="text-sm text-gray-600">{cat.description}</p>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => openEditCategory(cat)}
                          className="border p-2 rounded ring-1 ring-[#D4AF37]"

                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() =>
  setConfirm({ open: true, type: 'category', id: cat.id })
}

                          className="border p-2 rounded text-red-600 ring-1 ring-[#D4AF37]"

                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= ARTICLES ================= */}

          {activeTab === 'articles' && (
            <>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Articles</h2>

                <button
                  onClick={openAddArticle}
                  className="bg-amber-600 hover:bg-amber-700 text-white

 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus size={16} /> Add Article
                </button>
              </div>

              {showArticleForm && (
  <div className="bg-white p-5 rounded-lg shadow mb-6">

    {/* HEADER */}
    <div className="flex justify-between mb-3">
      <h3 className="font-semibold">
        {editingArticleId ? 'Edit Article' : 'Add Article'}
      </h3>

      <X
        className="cursor-pointer"
        onClick={() => setShowArticleForm(false)}
      />
    </div>

    {/* FORM */}
    <div className="grid gap-3">

                  <input
                    className="border p-2 rounded"
                    placeholder="Title"
                    value={articleForm.title}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, title: e.target.value })
                    }
                  />

                  <select
  className="border p-2 rounded"
  value={articleForm.category_id}
  onChange={(e) =>
    setArticleForm({
      ...articleForm,
      category_id: e.target.value,
    })
  }
>
  <option value="">Select category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

<select
  className="border p-2 rounded"
  value={articleForm.status}
  onChange={(e) =>
    setArticleForm({ ...articleForm, status: e.target.value })
  }
>
  <option value="draft">Draft</option>
  <option value="published">Published</option>
</select>


                  <textarea
                    className="border p-2 rounded"
                    placeholder="Content"
                    value={articleForm.content}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        content: e.target.value,
                      })
                    }
                  />

                   <div className="flex justify-end gap-2 mt-3">

                  <button
                    type="button"
                    onClick={generateArticleWithAI}
                    className="px-3 py-2 text-sm text-white rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 transition"
                  >
                    AI Draft
                  </button>

                  <button
                    onClick={saveArticle}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded"
                  >
                    Save
                  </button>

                </div>
       
                </div>
              </div>
              )}

              <div className="space-y-4">
                {articles.map((art) => {
                  const cat = categories.find(
                    (c) => c.id === art.category_id
                  );

                  return (
                    <div
  key={art.id}
  className="rounded-xl p-[2px] bg-yellow-400"
>
  <div className="bg-white p-6 rounded-lg shadow flex justify-between">

                      <div>
                       <h3 className="font-medium text-indigo-800">{art.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
  <span className="text-red-700">
  Category: {cat?.name || 'Deleted'}
</span>


  <span
    className={`px-2 py-0.5 rounded text-xs font-medium ${
      art.status === 'published'
        ? 'bg-green-100 text-green-700'
        : 'bg-yellow-100 text-yellow-700'
    }`}
  >
    {art.status}
  </span>
</div>

                        <p
  className="text-sm overflow-hidden"
  style={{
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  }}
>
  {art.content}
</p>



                      </div>

                      <div className="flex gap-3">
                        <button
  onClick={async () => {
  const newStatus = art.status === 'published' ? 'draft' : 'published';

  await updateArticle(art.id, { status: newStatus });

  const arts = await getArticles();
  setArticles(arts || []);
}}

  className="border px-2 rounded text-xs"
>
  {art.status === 'published' ? 'Unpublish' : 'Publish'}
</button>

                        <button
                          onClick={() => openEditArticle(art)}
                          className="border p-2 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() =>
  setConfirm({ open: true, type: 'article', id: art.id })
}

                          className="border p-2 rounded text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      {confirm.open && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h3 className="font-semibold mb-4">
        Are you sure you want to delete?
      </h3>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirm({ open: false, type: null, id: null })}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (confirm.type === 'category') {
              await deleteCategory(confirm.id);
            }

           if (confirm.type === 'article') {
  await deleteArticleHandler(confirm.id);
}


            setConfirm({ open: false, type: null, id: null });
          }}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }) {
  const colorMap = {
    'Published': 'text-green-600',
    'Drafts': 'text-yellow-400',
    'Total Articles': 'text-blue-600',
    'Total Categories': 'text-purple-600',
  };

  return (
    <div
  className="bg-white p-6 rounded-lg shadow border"
  style={{ borderColor: '#A5B4FC' }}
>

      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${colorMap[title] || ''}`}>
        {value}
      </p>
    </div>
  );
}


function TabButton({ active, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 transition ${
        active
          ? 'text-indigo-700 border-b-2 border-indigo-700'
          : 'text-gray-500 hover:text-indigo-700'
      }`}
    >
      {text}
    </button>
  );
}


function SidebarBtn({ text, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 rounded-lg cursor-pointer transition
        ${active
          ? 'bg-indigo-100 text-indigo-700 font-medium'
          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'}
      `}
    >
      {text}
    </div>
  );
}


