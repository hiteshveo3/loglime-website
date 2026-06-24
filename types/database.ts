export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type GenericRow = {
  id: string;
  created_at: string | null;
  updated_at?: string | null;
  [key: string]: Json | undefined;
};

type GenericTable<T extends GenericRow> = {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: GenericTable<{
        id: string;
        full_name: string | null;
        avatar_url: string | null;
        role: string | null;
        restaurant_name: string | null;
        restaurant_logo: string | null;
        phone: string | null;
        timezone: string | null;
        email_notifications: boolean | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      leads: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          company: string | null;
          restaurant_name: string | null;
          country: string | null;
          website: string | null;
          source: string | null;
          interested_products: string[] | null;
          budget: number | null;
          budget_currency: string | null;
          expected_launch: string | null;
          status: string | null;
          assigned_to: string | null;
          notes: string | null;
          created_by: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          restaurant_name?: string | null;
          country?: string | null;
          website?: string | null;
          source?: string | null;
          interested_products?: string[] | null;
          budget?: number | null;
          budget_currency?: string | null;
          expected_launch?: string | null;
          status?: string | null;
          assigned_to?: string | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          restaurant_name?: string | null;
          country?: string | null;
          website?: string | null;
          source?: string | null;
          interested_products?: string[] | null;
          budget?: number | null;
          budget_currency?: string | null;
          expected_launch?: string | null;
          status?: string | null;
          assigned_to?: string | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      customers: GenericTable<{
        id: string;
        profile_id: string | null;
        lead_id: string | null;
        business_name: string;
        contact_name: string | null;
        email: string | null;
        phone: string | null;
        country: string | null;
        website: string | null;
        stripe_customer_id: string | null;
        status: string | null;
        notes: string | null;
        created_by: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      products: GenericTable<{
        id: string;
        name: string;
        description: string | null;
        category: string | null;
        price: number | null;
        currency: string | null;
        setup_fee: number | null;
        is_recurring: boolean | null;
        billing_cycle: string | null;
        delivery_days: number | null;
        status: string | null;
        metadata: Json | null;
        created_at: string | null;
      }>;
      orders: GenericTable<{
        id: string;
        customer_id: string | null;
        status: string | null;
        payment_status: string | null;
        subtotal: number | null;
        discount: number | null;
        tax: number | null;
        total: number | null;
        currency: string | null;
        assigned_to: string | null;
        delivery_date: string | null;
        notes: string | null;
        stripe_payment_intent_id: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      projects: GenericTable<{
        id: string;
        customer_id: string | null;
        order_id: string | null;
        name: string;
        description: string | null;
        status: string | null;
        start_date: string | null;
        end_date: string | null;
        progress: number | null;
        created_by: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      tasks: GenericTable<{
        id: string;
        title: string;
        description: string | null;
        priority: string | null;
        status: string | null;
        due_date: string | null;
        assigned_to: string | null;
        related_type: string | null;
        related_id: string | null;
        project_id: string | null;
        created_by: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      tickets: GenericTable<{
        id: string;
        customer_id: string | null;
        title: string;
        category: string | null;
        priority: string | null;
        status: string | null;
        assigned_to: string | null;
        resolution_notes: string | null;
        ai_created: boolean | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      invoices: GenericTable<{
        id: string;
        invoice_number: string | null;
        customer_id: string | null;
        order_id: string | null;
        line_items: Json | null;
        subtotal: number | null;
        discount: number | null;
        tax: number | null;
        total: number | null;
        currency: string | null;
        status: string | null;
        due_date: string | null;
        paid_at: string | null;
        stripe_invoice_id: string | null;
        stripe_payment_link: string | null;
        created_by: string | null;
        created_at: string | null;
      }>;
      blog_authors: GenericTable<{
        id: string;
        user_id: string | null;
        name: string;
        username: string;
        bio: string | null;
        avatar_url: string | null;
        role_title: string | null;
        twitter_handle: string | null;
        linkedin_url: string | null;
        expertise: string[] | null;
        post_count: number | null;
        created_at: string | null;
      }>;
      blog_categories: GenericTable<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        color: string | null;
        icon: string | null;
        post_count: number | null;
        sort_order: number | null;
        created_at: string | null;
      }>;
      blog_tags: GenericTable<{
        id: string;
        name: string;
        slug: string;
        post_count: number | null;
        created_at: string | null;
      }>;
      blog_posts: GenericTable<{
        id: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        content_html: string | null;
        featured_image: string | null;
        featured_image_alt: string | null;
        featured_image_caption: string | null;
        author_id: string | null;
        category_id: string | null;
        status: string | null;
        is_featured: boolean | null;
        is_pillar: boolean | null;
        reading_time_minutes: number | null;
        word_count: number | null;
        view_count: number | null;
        like_count: number | null;
        comment_count: number | null;
        seo_title: string | null;
        seo_description: string | null;
        canonical_url: string | null;
        og_image: string | null;
        schema_faq: Json | null;
        related_product_slugs: string[] | null;
        published_at: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      blog_comments: GenericTable<{
        id: string;
        post_id: string | null;
        post_slug: string | null;
        parent_id: string | null;
        author_user_id: string | null;
        author_name: string;
        author_email: string;
        author_website: string | null;
        author_ip: string | null;
        author_user_agent: string | null;
        content: string;
        content_html: string | null;
        status: string | null;
        is_pinned: boolean | null;
        like_count: number | null;
        spam_score: number | null;
        spam_reasons: string[] | null;
        time_on_page_seconds: number | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      blog_post_likes: GenericTable<{
        id: string;
        post_id: string | null;
        post_slug: string | null;
        visitor_fingerprint: string;
        created_at: string | null;
      }>;
      blog_comment_likes: GenericTable<{
        id: string;
        comment_id: string | null;
        visitor_fingerprint: string;
        created_at: string | null;
      }>;
      blog_comment_reports: GenericTable<{
        id: string;
        comment_id: string | null;
        reporter_fingerprint: string | null;
        reason: string | null;
        created_at: string | null;
      }>;
      spam_rules: GenericTable<{
        id: string;
        rule_type: string;
        rule_value: string;
        action: string | null;
        is_active: boolean | null;
        created_at: string | null;
      }>;
      blog_newsletter_signups: GenericTable<{
        id: string;
        email: string;
        source_post_id: string | null;
        source_post_slug: string | null;
        source_type: string | null;
        confirmed: boolean | null;
        created_at: string | null;
      }>;
      lead_activities: GenericTable<{
        id: string;
        lead_id: string | null;
        type: string | null;
        content: string | null;
        metadata: Json | null;
        created_by: string | null;
        created_at: string | null;
      }>;
      project_updates: GenericTable<{
        id: string;
        project_id: string | null;
        content: string | null;
        visible_to_customer: boolean | null;
        created_by: string | null;
        created_at: string | null;
      }>;
      project_milestones: GenericTable<{
        id: string;
        project_id: string | null;
        title: string | null;
        due_date: string | null;
        completed: boolean | null;
        completed_at: string | null;
        sort_order: number | null;
        created_at: string | null;
      }>;
      project_members: {
        Row: { project_id: string; user_id: string; role: string | null };
        Insert: { project_id: string; user_id: string; role?: string | null };
        Update: { project_id?: string; user_id?: string; role?: string | null };
        Relationships: [];
      };
      ticket_messages: GenericTable<{
        id: string;
        ticket_id: string | null;
        sender_id: string | null;
        content: string | null;
        is_internal_note: boolean | null;
        attachments: Json | null;
        created_at: string | null;
      }>;
      threads: GenericTable<{
        id: string;
        customer_id: string | null;
        subject: string | null;
        status: string | null;
        last_message_at: string | null;
        created_at: string | null;
      }>;
      messages: GenericTable<{
        id: string;
        thread_id: string | null;
        sender_id: string | null;
        content: string | null;
        attachments: Json | null;
        read_by: string[] | null;
        created_at: string | null;
      }>;
      notifications: GenericTable<{
        id: string;
        user_id: string | null;
        type: string | null;
        title: string | null;
        body: string | null;
        link: string | null;
        read: boolean | null;
        created_at: string | null;
      }>;
      calendar_events: GenericTable<{
        id: string;
        title: string;
        type: string | null;
        start_time: string | null;
        end_time: string | null;
        all_day: boolean | null;
        related_type: string | null;
        related_id: string | null;
        created_by: string | null;
        created_at: string | null;
      }>;
      documents: GenericTable<{
        id: string;
        name: string;
        file_path: string | null;
        file_type: string | null;
        file_size: number | null;
        folder: string | null;
        related_type: string | null;
        related_id: string | null;
        customer_id: string | null;
        uploaded_by: string | null;
        created_at: string | null;
      }>;
      kb_articles: GenericTable<{
        id: string;
        title: string;
        slug: string | null;
        category: string | null;
        content: string | null;
        status: string | null;
        created_by: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      announcements: GenericTable<{
        id: string;
        title: string;
        content: string | null;
        status: string | null;
        published_at: string | null;
        created_by: string | null;
        created_at: string | null;
      }>;
      ai_conversations: GenericTable<{
        id: string;
        user_id: string | null;
        visitor_email: string | null;
        mode: string | null;
        messages: Json | null;
        lead_created: boolean | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      task_comments: GenericTable<{
        id: string;
        task_id: string | null;
        content: string | null;
        created_by: string | null;
        created_at: string | null;
      }>;
      order_items: GenericTable<{
        id: string;
        order_id: string | null;
        product_id: string | null;
        quantity: number | null;
        unit_price: number | null;
        total: number | null;
        created_at: string | null;
      }>;
      launch_spots: {
        Row: {
          id: number;
          claimed: number;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          claimed?: number;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          claimed?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
