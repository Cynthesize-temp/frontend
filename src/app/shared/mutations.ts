import gql from 'graphql-tag';
import { ISSUE_COMMENT_FRAGMENT, ISSUE_COMMENT_REPLY_FRAGMENT, USER_DETAILS_FRAGMENT } from './fragments';

const MUTATION_ADD_USER = gql`
  mutation insert_user($objects: [user_insert_input!]!) {
    insert_user(objects: $objects) {
      affected_rows
      returning {
        ...UserDetailsFragment
      }
    }
  }
  ${USER_DETAILS_FRAGMENT}
`;

const MUTATION_ADD_PROJECT = gql`
  mutation insert_project($objects: [project_insert_input!]!) {
    insert_project(objects: $objects) {
      affected_rows
      returning {
        id
        project_name
      }
    }
  }
`;

const MUTATION_ADD_IDEA = gql`
  mutation insert_ideas($objects: [ideas_insert_input!]!) {
    insert_ideas(objects: $objects) {
      affected_rows
      returning {
        id
        idea_name
      }
    }
  }
`;

const MUTATION_DELETE_IDEA = gql`
  mutation delete_ideas($ideaId: Int!) {
    delete_ideas(where: { id: { _eq: $ideaId } }) {
      affected_rows
      returning {
        id
        idea_name
      }
    }
  }
`;

const MUTATION_LIKE_IDEA = gql`
  mutation update_upvotes($likesOffsetCounter: Int!, $ideaId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { likes: $likesOffsetCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
  }
`;

const MUTATION_ADD_ISSUE = gql`
  mutation insert_project_issues($objects: [project_issues_insert_input!]!) {
    insert_project_issues(objects: $objects) {
      affected_rows
      returning {
        id
        checkpoint_name
      }
    }
  }
`;

const MUTATION_ADD_ISSUE_COMMENT = gql`
  mutation insert_project_issues_comments($objects: [project_issues_comments_insert_input!]!) {
    insert_project_issues_comments(objects: $objects) {
      affected_rows
      returning {
        ...IssueCommentFragment
      }
    }
  }
  ${ISSUE_COMMENT_FRAGMENT}
`;

const MUTATION_ADD_ISSUE_COMMENT_REPLY = gql`
  mutation insert_project_issues_reply($objects: [project_issues_reply_insert_input!]!) {
    insert_project_issues_reply(objects: $objects) {
      affected_rows
      returning {
        ...IssueCommentReplyFragment
      }
    }
  }
  ${ISSUE_COMMENT_REPLY_FRAGMENT}
`;

const MUTATION_UPDATE_LIKE_COUNTER_WITH_INSERT = gql`
  mutation update_likes($likesOffCounter: Int!, $commentId: Int!, $userId: Int!) {
    update_project_issues_comments(where: { id: { _eq: $commentId } }, _inc: { likes: $likesOffCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    insert_project_issues_comments_likes(objects: { user_id: $userId, comment_id: $commentId }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_UPDATE_LIKE_COUNTER_WITH_DELETE = gql`
  mutation update_likes($likesOffCounter: Int!, $commentId: Int!, $userId: Int!) {
    update_project_issues_comments(where: { id: { _eq: $commentId } }, _inc: { likes: $likesOffCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    delete_project_issues_comments_likes(where: { user_id: { _eq: $userId }, comment_id: { _eq: $commentId } }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_UPDATE_USER_DETAILS = gql`
  mutation update_user_details($updateObject: user_set_input!, $userId: Int!) {
    update_user(where: { id: { _eq: $userId } }, _set: $updateObject) {
      affected_rows
      returning {
        ...UserDetailsFragment
      }
    }
  }
  ${USER_DETAILS_FRAGMENT}
`;

export {
  MUTATION_ADD_IDEA,
  MUTATION_DELETE_IDEA,
  MUTATION_ADD_ISSUE,
  MUTATION_ADD_ISSUE_COMMENT,
  MUTATION_ADD_ISSUE_COMMENT_REPLY,
  MUTATION_ADD_PROJECT,
  MUTATION_ADD_USER,
  MUTATION_UPDATE_LIKE_COUNTER_WITH_DELETE,
  MUTATION_UPDATE_LIKE_COUNTER_WITH_INSERT,
  MUTATION_LIKE_IDEA,
  MUTATION_UPDATE_USER_DETAILS
};
