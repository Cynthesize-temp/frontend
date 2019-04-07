import gql from 'graphql-tag';
import { USER_PROFILE_PIC_FRAGMENT } from './user-fragments';

const IDEA_REPLY_FRAGMENT = gql`
  fragment IdeaReplyFragment on reply {
    id
    reply_text
    userByrespondent {
      ...UserProfilePicFragment
    }
    likes
    timestamp
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const IDEA_COMMENTS_FRAGMENT = gql`
  fragment IdeaCommentFragment on comment {
    id
    comment_text
    idea_id
    likes
    timestamp
    user {
      ...UserProfilePicFragment
    }
    replies {
      ...IdeaReplyFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
  ${IDEA_REPLY_FRAGMENT}
`;

const IDEA_DETAILS_FRAGMENT = gql`
  fragment IdeaDetailsFragment on ideas {
    id
    userByowner {
      ...UserProfilePicFragment
    }
    idea_name
    timestamp
    description
    likes
    tagsLinkssByideaId {
      tagsBytagId {
        tag_name
      }
    }
    comments {
      ...IdeaCommentFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
  ${IDEA_COMMENTS_FRAGMENT}
`;

const IDEA_FEED_FRAGMENT = gql`
  fragment IdeaFeedFragment on user {
    ideassByowner(limit: 8) {
      id
      idea_name
      description
      likes
      userByowner {
        username
        profile_pic
      }
    }
  }
`;

export { IDEA_DETAILS_FRAGMENT, IDEA_COMMENTS_FRAGMENT, IDEA_REPLY_FRAGMENT, IDEA_FEED_FRAGMENT };
